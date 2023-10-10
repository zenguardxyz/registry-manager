import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { AddressZero } from "@ethersproject/constants";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { IntegrationType } from "./utils/constants";
import { getSchemaUID, EAS, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import { SignerOrProvider } from "@ethereum-attestation-service/eas-sdk/dist/transaction";

describe("SafeProtocolRegistryAttestation", async () => {
    let owner: SignerOrProvider, user1: SignerWithAddress;

    async function deployContractFixture() {
        [owner, user1] = await ethers.getSigners();
        const safeProtocolRegistry = await ethers.deployContract("SafeProtocolRegistryAttestation", [owner]);

        const safe = await ethers.deployContract("TestExecutor");
        const safeProtocolManager = await (
            await ethers.getContractFactory("SafeProtocolManagerAttestation")
        ).deploy(owner, await safeProtocolRegistry.getAddress());
        
        const schemaRegistry = await ethers.deployContract("SchemaRegistry");

        const eas = await ethers.deployContract('EAS', [await schemaRegistry.getAddress()]);

        const resolver = await ethers.deployContract("ResolverSample", [await eas.getAddress()]);

        return {safeProtocolManager, safe, safeProtocolRegistry, schemaRegistry, eas, resolver};
    }

    it("Should allow add a integration only once", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);
        await expect(safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin)).to.be.revertedWithCustomError(
            safeProtocolRegistry,
            "CannotAddIntegration",
        );
    });


    it("Should allow only owner to flag a integration", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);

        await expect(safeProtocolRegistry.connect(user1).flagIntegration(AddressZero)).to.be.revertedWith(
            "Ownable: caller is not the owner",
        );

        expect(await safeProtocolRegistry.connect(owner).flagIntegration(AddressZero));

        const {flaggedAt } = await safeProtocolRegistry.checkAttest.staticCall(AddressZero);
        expect(flaggedAt).to.be.gt(0);
    });

    it("Should allow to add attestation", async () => {

        const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const schema = 'uint256 eventId, uint8 voteIndex'
        const { safeProtocolRegistry, schemaRegistry, eas, resolver } = await loadFixture(deployContractFixture);

        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
        ]);
        
        


        await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);

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

        expect(await safeProtocolRegistry.connect(owner).attestIntegration(AddressZero, await eas.getAddress(), newAttestationUID ));

        const {attestationId } = await safeProtocolRegistry.checkAttest.staticCall(AddressZero);

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

        await safeProtocolRegistry.connect(owner).addIntegration(pluginAddress, IntegrationType.Plugin);

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

        expect(await safeProtocolRegistry.connect(owner).attestIntegration(pluginAddress, await eas.getAddress(), newAttestationUID ));

        const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
        await safe.exec(await safeProtocolManager.getAddress(), 0, data);
        // expect(await safeProtocolManager.getPluginInfo(await safe.getAddress(), pluginAddress)).to.eql([false, SENTINEL_MODULES]);
    });


});