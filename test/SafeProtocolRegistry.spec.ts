import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { AddressZero } from "@ethersproject/constants";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { IntegrationType } from "./utils/constants";

describe("SafeProtocolRegistry", async () => {
    let owner: SignerWithAddress, user1: SignerWithAddress;

    async function deployContractFixture() {
        [owner, user1] = await ethers.getSigners();
        const safeProtocolRegistry = await ethers.deployContract("SafeProtocolRegistry", [owner.address]);
        return { safeProtocolRegistry };
    }

    it("Should allow add a integration only once", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);
        await expect(safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin)).to.be.revertedWithCustomError(
            safeProtocolRegistry,
            "CannotAddIntegration",
        );
    });

    it("Should not allow non-owner to add a integration", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await expect(safeProtocolRegistry.connect(user1).addIntegration(AddressZero, IntegrationType.Plugin)).to.be.revertedWith(
            "Ownable: caller is not the owner",
        );
    });

    it("Should not allow to flag non-listed integration", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await expect(safeProtocolRegistry.connect(owner).flagIntegration(AddressZero)).to.be.revertedWithCustomError(
            safeProtocolRegistry,
            "CannotFlagIntegration",
        );
    });

    it("Should allow only owner to flag a integration", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);

        await expect(safeProtocolRegistry.connect(user1).flagIntegration(AddressZero)).to.be.revertedWith(
            "Ownable: caller is not the owner",
        );

        expect(await safeProtocolRegistry.connect(owner).flagIntegration(AddressZero));

        const [flaggedAt] = await safeProtocolRegistry.check.staticCall(AddressZero);
        expect(flaggedAt).to.be.gt(0);
    });

    it("Should allow only owner to flag a integration only once", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        await safeProtocolRegistry.connect(owner).addIntegration(AddressZero, IntegrationType.Plugin);

        await expect(safeProtocolRegistry.connect(user1).flagIntegration(AddressZero)).to.be.revertedWith(
            "Ownable: caller is not the owner",
        );

        await safeProtocolRegistry.connect(owner).flagIntegration(AddressZero);
        await expect(safeProtocolRegistry.connect(owner).flagIntegration(AddressZero))
            .to.be.revertedWithCustomError(safeProtocolRegistry, "CannotFlagIntegration")
            .withArgs(AddressZero);
    });

    it("Should return (0,0) for non-listed integration", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        const [listedAt, flaggedAt] = await safeProtocolRegistry.check.staticCall(AddressZero);
        expect(listedAt).to.be.equal(0);
        expect(flaggedAt).to.be.equal(0);
    });

    it("Should return true when valid interfaceId is passed", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        expect(await safeProtocolRegistry.supportsInterface.staticCall("0x01ffc9a7")).to.be.true;
        expect(await safeProtocolRegistry.supportsInterface.staticCall("0xc23697a8")).to.be.true;
    });

    it("Should return false when invalid interfaceId is passed", async () => {
        const { safeProtocolRegistry } = await loadFixture(deployContractFixture);
        expect(await safeProtocolRegistry.supportsInterface.staticCall("0x00000000")).to.be.false;
        expect(await safeProtocolRegistry.supportsInterface.staticCall("0xbaddad42")).to.be.false;
        expect(await safeProtocolRegistry.supportsInterface.staticCall("0xffffffff")).to.be.false;
    });
});
