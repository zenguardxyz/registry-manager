import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { AddressZero } from "@ethersproject/constants";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { MODULE_TYPE_PLUGIN, MODULE_TYPE_HOOKS, MODULE_TYPE_FUNCTION_HANDLER } from "../src/utils/constants";
import { getSchemaUID, EAS, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import { SignerOrProvider } from "@ethereum-attestation-service/eas-sdk/dist/transaction";
import { getHooksWithPassingChecks } from "./utils/mockHooksBuilder";
import { getPluginWithFailingCallToSupportsInterfaceMethod } from "./utils/mockPluginBuilder";
import { PLUGIN_PERMISSION_DELEGATE_CALL, PLUGIN_PERMISSION_EXECUTE_CALL } from "../src/utils/constants";
// import { ethers } from "ethers";

describe("SafeProtocolRegistryAttestation", async () => {
    let owner: SignerOrProvider, user1: SignerWithAddress;

    async function deployContractFixture() {
        [owner, user1] = await ethers.getSigners();

        const safeProtocolRegistry = await ethers.deployContract("SafeProtocolRegistryAttestation", [owner]);
        const safeProtocolManager = await (
            await ethers.getContractFactory("SafeProtocolManagerAttestation")
        ).deploy(owner, await safeProtocolRegistry.getAddress());

        const safe = await ethers.deployContract("TestExecutor", [safeProtocolManager.target], { signer: owner });

        const schemaRegistry = await ethers.deployContract("SchemaRegistry");

        const eas = await ethers.deployContract('EAS', [await schemaRegistry.getAddress()]);

        const resolver = await ethers.deployContract("ResolverSample", [await eas.getAddress()]);

        return {safeProtocolManager, safe, safeProtocolRegistry, schemaRegistry, eas, resolver};
    }

    it("Should allow add a module only once", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        const mockHookAddress = (await getHooksWithPassingChecks()).target;
        await safeProtocolRegistry.connect(owner).addModule(mockHookAddress, MODULE_TYPE_PLUGIN);
        await expect(safeProtocolRegistry.connect(owner).addModule(mockHookAddress, MODULE_TYPE_PLUGIN)).to.be.revertedWithCustomError(
            safeProtocolRegistry,
            "CannotAddModule",
        );
    });


    it("Should allow only owner to flag a module", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        const mockHookAddress = (await getHooksWithPassingChecks()).target;

        await safeProtocolRegistry.connect(owner).addModule(mockHookAddress, MODULE_TYPE_PLUGIN);

        await expect(safeProtocolRegistry.connect(user1).flagModule(mockHookAddress)).to.be.revertedWith(
            "Ownable: caller is not the owner",
        );

        expect(await safeProtocolRegistry.connect(owner).flagModule(mockHookAddress));

        const {flaggedAt } = await safeProtocolRegistry.checkAttest.staticCall(mockHookAddress);
        expect(flaggedAt).to.be.gt(0);
    });



    it("Should allow to add attestation", async () => {

        const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const schema = 'uint256 eventId, uint8 voteIndex'
        const { safeProtocolRegistry, schemaRegistry, eas, resolver } = await loadFixture(deployContractFixture);

        const mockHookAddress = (await getHooksWithPassingChecks()).target;

        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
        ]);
        
        


        await safeProtocolRegistry.connect(owner).addModule(mockHookAddress, MODULE_TYPE_PLUGIN);

        await schemaRegistry.register(schema, await resolver.getAddress(), true);

        const schemaId = getSchemaUID(schema, await resolver.getAddress(), true);

        const easInst = new EAS(await eas.getAddress());

        const attestation = await easInst.connect(owner).attest(
                {
                    schema: schemaId,
                    data: ({
                        recipient: AddressZero, // No recipient
                        // expirationTime: 0, // No expiration time
                        revocable: true,
                        refUID: ZERO_BYTES32, // No references UI
                        data: encodedData, // Encode a single uint256 as a parameter to the schema
                        // value: 0 // No value/ETH
                    })
                }
        );

        const newAttestationUID = await attestation.wait();

        expect(await safeProtocolRegistry.connect(owner).attestModule(mockHookAddress, await eas.getAddress(), newAttestationUID ));

        const {attestationId } = await safeProtocolRegistry.checkAttest.staticCall(mockHookAddress);

        const { attester }  = await eas.getAttestation.staticCall(attestationId)

        expect(attester).to.be.eq(attester);

        expect(newAttestationUID).to.be.eq(attestationId);


    });

    it("Should allow a Safe to enable a plugin after attestation", async () => {

        const { schemaRegistry, safeProtocolRegistry, safeProtocolManager, safe, eas, resolver } = await loadFixture(deployContractFixture);
        const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const schema = 'uint256 eventId, uint8 voteIndex'

        const plugin = await (await ethers.getContractFactory("TestPlugin")).deploy();
        const pluginAddress = await plugin.getAddress();

        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
        ]);

        await safeProtocolRegistry.connect(owner).addModule(pluginAddress, MODULE_TYPE_PLUGIN);

        await schemaRegistry.register(schema, await resolver.getAddress(), true);

        const schemaId = getSchemaUID(schema, await resolver.getAddress(), true);

        const easInst = new EAS(await eas.getAddress());

        const attestation = await easInst.connect(owner).attest(
                {
                    schema: schemaId,
                    data: ({
                        recipient: AddressZero, // No recipient
                        // expirationTime: 0, // No expiration time
                        revocable: true,
                        refUID: ZERO_BYTES32, // No references UI
                        data: encodedData, // Encode a single uint256 as a parameter to the schema
                        // value: 0 // No value/ETH
                    })
                }
        );

        const newAttestationUID = await attestation.wait();

        expect(await safeProtocolRegistry.connect(owner).attestModule(pluginAddress, await eas.getAddress(), newAttestationUID ));

        const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, PLUGIN_PERMISSION_EXECUTE_CALL]);

        await safe.exec(safe.target, 0, data);
    });


    it("Should allow a Safe to enable a hook after attestation", async () => {

        const { schemaRegistry, safeProtocolRegistry, safeProtocolManager, safe, eas, resolver } = await loadFixture(deployContractFixture);
        const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const schema = 'uint256 eventId, uint8 voteIndex'

        const plugin = await (await ethers.getContractFactory("TestHooks")).deploy();
        const hookAddress = await plugin.getAddress();

        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
        ]);

        await safeProtocolRegistry.connect(owner).addModule(hookAddress, MODULE_TYPE_HOOKS);

        await schemaRegistry.register(schema, await resolver.getAddress(), true);

        const schemaId = getSchemaUID(schema, await resolver.getAddress(), true);

        const easInst = new EAS(await eas.getAddress());

        const attestation = await easInst.connect(owner).attest(
                {
                    schema: schemaId,
                    data: ({
                        recipient: AddressZero, // No recipient
                        // expirationTime: 0, // No expiration time
                        revocable: true,
                        refUID: ZERO_BYTES32, // No references UI
                        data: encodedData, // Encode a single uint256 as a parameter to the schema
                        // value: 0 // No value/ETH
                    })
                }
        );

        const newAttestationUID = await attestation.wait();

        expect(await safeProtocolRegistry.connect(owner).attestModule(hookAddress, await eas.getAddress(), newAttestationUID ));

        const data = safeProtocolManager.interface.encodeFunctionData("setHooks", [hookAddress]);
        await safe.exec(safe.target, 0, data);
    });


});
