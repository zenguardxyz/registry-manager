import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { AddressZero } from "@ethersproject/constants";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { IntegrationType } from "./utils/constants";
import { getSchemaUID, EAS, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import { SignerOrProvider } from "@ethereum-attestation-service/eas-sdk/dist/transaction";
import { ZeroAddress } from "ethers";

describe("SafeProtocolRegistryAttestation", async () => {
    let owner: SignerOrProvider, user1: SignerWithAddress;

    async function deployContractFixture() {
        [owner, user1] = await ethers.getSigners();
    
        const schemaRegistry = await ethers.deployContract("SchemaRegistry");

        const eas = await ethers.deployContract('EAS', [await schemaRegistry.getAddress()]);

        const resolver = await ethers.deployContract("ResolverSample", [await eas.getAddress()]);

        const safeProtocolRegistry = await ethers.deployContract("SafeProtocolRegistryAttestation", [owner, await eas.getAddress()]);

        const safe = await ethers.deployContract("TestExecutor");
        const safeProtocolManager = await (
            await ethers.getContractFactory("SafeProtocolManagerAttestation")
        ).deploy(owner, await safeProtocolRegistry.getAddress());
        
            
        return {safeProtocolManager, safe, safeProtocolRegistry, schemaRegistry, eas, resolver};
    }

    // it("Should allow add a integration only once", async () => {
    //     const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
    //     await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);
    //     await expect(safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin)).to.be.revertedWithCustomError(
    //         safeProtocolRegistry,
    //         "Publisher not verified"
    //     )
    // });



    it("Should allow to verify publisher and add integration", async () => {

        const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const schema = 'bool verified'
        const { safeProtocolRegistry, schemaRegistry, eas, resolver } = await loadFixture(deployContractFixture);

        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
        { name: "verified", value: true, type: "bool" }
        ]);
        
        

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

        expect(await safeProtocolRegistry.connect(owner).attestPublisher(newAttestationUID ));

        expect(safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin));



    });


    it("Should allow a Safe to enable a plugin after publisher verification", async () => {

        const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const schema = 'bool verified, uint8 score, uint8[] profiles'
        const { safe, safeProtocolManager, safeProtocolRegistry, schemaRegistry, eas, resolver } = await loadFixture(deployContractFixture);

        const plugin = await (await ethers.getContractFactory("TestPlugin")).deploy();
        const pluginAddress = await plugin.getAddress();
        
        const schemaEncoder = new SchemaEncoder(schema);
        const encodedData = schemaEncoder.encodeData([
        { name: "verified", value: true, type: "bool" },
        { name: "score", value: 8, type: "uint8" },
        { name: "profiles", value: [1,2], type: "uint8[]" },
        ]);
        
        

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

        expect(await safeProtocolRegistry.connect(owner).attestPublisher(newAttestationUID ));

        expect(await safeProtocolRegistry.connect(owner).addIntegration(pluginAddress, IntegrationType.Plugin));

        const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
        await safe.exec(await safeProtocolManager.getAddress(), 0, data);

    });

});