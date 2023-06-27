import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import BigNumber from "bignumber.js";
import { TestModule } from "../typechain-types";

describe("SafeProtocolMediator", async () => {
    let deployer: SignerWithAddress, owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress;

    async function deployContractFixture() {
        [deployer, owner, user1, user2] = await hre.ethers.getSigners();
        const safeProtocolMediator = await (await hre.ethers.getContractFactory("SafeProtocolMediator")).deploy();
        return { safeProtocolMediator };
    }

    describe("Setup mediator", async () => {
        it("Should set mediator as a module for a safe", async () => {
            const safe = await hre.ethers.deployContract("TestExecutor");

            const { safeProtocolMediator } = await loadFixture(deployContractFixture);
            await safe.setModule(await safeProtocolMediator.getAddress());
        });
    });

    describe("Modules", async () => {
        async function deployContractsFixture() {
            // TODO: Reuse parent fixture
            [deployer, owner, user1, user2] = await hre.ethers.getSigners();
            const safeProtocolMediator = await (await hre.ethers.getContractFactory("SafeProtocolMediator")).deploy();
            const safe = await hre.ethers.deployContract("TestExecutor");
            const module = await (await hre.ethers.getContractFactory("TestModule")).deploy();
            return { safeProtocolMediator, safe, module };
        }

        it("Should allow a Safe to enable a module through a mediator", async () => {
            const { safeProtocolMediator, safe, module } = await loadFixture(deployContractsFixture);
            await safe.setModule(await safeProtocolMediator.getAddress());
            const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), false]);
            await safe.exec(await safeProtocolMediator.getAddress(), 0, data);
            // TODO: Check for emitted events and param values
            expect(await safeProtocolMediator.getModuleInfo(await safe.getAddress(), await module.getAddress())).to.eql([true, false]);
        });

        it("Should fail to enable a module (with non root access) with root access", async () => {
            const { safeProtocolMediator, safe, module } = await loadFixture(deployContractsFixture);
            await safe.setModule(await safeProtocolMediator.getAddress());
            const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), true]);

            await expect(safe.exec(await safeProtocolMediator.getAddress(), 0, data)).to.be.revertedWithCustomError(
                safeProtocolMediator,
                "ModuleAccessMismatch",
            );
            expect(await safeProtocolMediator.getModuleInfo(await safe.getAddress(), await module.getAddress())).to.eql([false, false]);
        });

        it("Should disable a module", async () => {
            const { safeProtocolMediator, safe, module } = await loadFixture(deployContractsFixture);
            await safe.setModule(await safeProtocolMediator.getAddress());
            const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), false]);
            await safe.exec(await safeProtocolMediator.getAddress(), 0, data);
            expect(await safeProtocolMediator.getModuleInfo(await safe.getAddress(), await module.getAddress())).to.eql([true, false]);

            const data2 = safeProtocolMediator.interface.encodeFunctionData("disableModule", [await module.getAddress()]);
            await safe.exec(await safeProtocolMediator.getAddress(), 0, data2);
            // TODO: Check for emitted events and param values
            expect(await safeProtocolMediator.getModuleInfo(await safe.getAddress(), await module.getAddress())).to.eql([false, false]);
        });
    });

    describe("Execute transaction from module", async () => {
        async function deployContractsFixture() {
            [deployer, owner, user1, user2] = await hre.ethers.getSigners();
            const safeProtocolMediator = await (await hre.ethers.getContractFactory("SafeProtocolMediator")).deploy();
            const safe = await hre.ethers.deployContract("TestExecutor");
            await safe.setModule(await safeProtocolMediator.getAddress());

            return { safeProtocolMediator, safe };
        }

        describe("Module with non-root access", async () => {
            it("Should not allow non-enabled module to execute tx from a safe", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);
                const module = await (await hre.ethers.getContractFactory("TestModule")).deploy();
                // TODO: Replace with builder function
                const safeTx = {
                    actions: [
                        {
                            to: user2.address,
                            value: hre.ethers.parseEther("1"),
                            data: "0x",
                        },
                    ],
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolMediator,
                    "MoudleNotEnabled",
                );
            });

            it("Should process a SafeTransaction", async function () {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModule")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), false]);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: await safe.getAddress(),
                        value: amount,
                    })
                ).wait();
                // TODO: Replace with builder function
                const safeTx = {
                    actions: [
                        {
                            to: user2.address,
                            value: hre.ethers.parseEther("1"),
                            data: "0x",
                        },
                    ],
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                const balanceBefore = (await hre.ethers.provider.getBalance(user2.address)).toString();
                const tx = await module.executeFromModule(safeProtocolMediator, safe, safeTx);
                await tx.wait();
                const balanceAfter = (await hre.ethers.provider.getBalance(user2.address)).toString();

                expect(BigNumber(balanceAfter)).to.eql(BigNumber(balanceBefore).plus(amount.toString()));
                expect((await hre.ethers.provider.getBalance(await safe.getAddress())).toString()).to.eql("0");

                await expect(tx)
                    .to.emit(safeProtocolMediator, "ActionExecuted")
                    .withArgs(await safe.getAddress(), safeTx.metaHash, 0);
            });

            it("Should fail to process a SafeTransaction", async function () {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModule")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), false]);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);
                const safeTx = {
                    actions: [
                        {
                            to: user2.address,
                            value: hre.ethers.parseEther("1"),
                            data: "0x",
                        },
                    ],
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };
                const balanceBefore = (await hre.ethers.provider.getBalance(user2.address)).toString();

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolMediator,
                    "ActionExecutionFailed",
                );
                const balanceAfter = (await hre.ethers.provider.getBalance(user2.address)).toString();
                expect(BigNumber(balanceAfter)).to.eql(BigNumber(balanceBefore));
            });

            it("Should not process a SafeTransaction when executing non-root access from root access module", async function () {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModule")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), false]);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                await module.setRequiresRootAccess(true);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: await safe.getAddress(),
                        value: amount,
                    })
                ).wait();
                // TODO: Replace with builder function
                const safeTx = {
                    actions: [
                        {
                            to: user2.address,
                            value: hre.ethers.parseEther("1"),
                            data: "0x",
                        },
                    ],
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolMediator,
                    "ModuleRequiresRootAccess",
                );
            });

            it("Should emit ModuleRequiresRootAccess for a non-root access module", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModule")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), true]);
                // Required to set module to indicate that it does requires root access.
                await module.setRequiresRootAccess(true);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                // Reset root access flag
                await module.setRequiresRootAccess(false);

                // TODO: Replace with builder function
                const safeTx = {
                    actions: [
                        {
                            to: user2.address,
                            value: hre.ethers.parseEther("1"),
                            data: "0x",
                        },
                    ],
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx))
                    .to.be.revertedWithCustomError(safeProtocolMediator, "ModuleEnabledOnlyForRootAccess")
                    .withArgs(await module.getAddress());
            });
        });

        describe("Module with root access", async () => {
            it("Should run a transaction from root access enabled module", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                const testDelegateCallReceiver = await (
                    await hre.ethers.getContractFactory("TestDelegateCallReceiver")
                ).deploy(user2.address);

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModuleWithRootAccess")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), true]);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: await safe.getAddress(),
                        value: amount,
                    })
                ).wait();
                // TODO: Replace with builder function
                const safeTx = {
                    action: {
                        to: await testDelegateCallReceiver.getAddress(),
                        value: hre.ethers.parseEther("1"),
                        data: "0x",
                    },
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                const balanceBefore = (await hre.ethers.provider.getBalance(user2.address)).toString();
                const tx = await module.executeFromModule(safeProtocolMediator, safe, safeTx);
                await tx.wait();
                const balanceAfter = (await hre.ethers.provider.getBalance(user2.address)).toString();

                expect(BigNumber(balanceAfter)).to.eql(BigNumber(balanceBefore).plus(amount.toString()));
                expect((await hre.ethers.provider.getBalance(await safe.getAddress())).toString()).to.eql("0");

                await expect(tx)
                    .to.emit(safeProtocolMediator, "RootAccessActionExecuted")
                    .withArgs(await safe.getAddress(), safeTx.metaHash);
            });

            it("Should not allow non-enabled module to execute root tx from a safe", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);
                const module = await (await hre.ethers.getContractFactory("TestModuleWithRootAccess")).deploy();
                // TODO: Replace with builder function
                const safeTx = {
                    action: {
                        to: user2.address,
                        value: hre.ethers.parseEther("1"),
                        data: "0x",
                    },
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolMediator,
                    "MoudleNotEnabled",
                );
            });

            it("Should revert with ModuleRequiresRootAccess", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                const testDelegateCallReceiver = await (
                    await hre.ethers.getContractFactory("TestDelegateCallReceiver")
                ).deploy(user2.address);

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModuleWithRootAccess")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), true]);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                await module.setRequiresRootAccess(false);

                // TODO: Replace with builder function
                const safeTx = {
                    action: {
                        to: await testDelegateCallReceiver.getAddress(),
                        value: hre.ethers.parseEther("1"),
                        data: "0x",
                    },
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolMediator,
                    "ModuleRequiresRootAccess",
                );
            });

            it("Should emit RootAccessActionExecutionFailed when root access action execution fails", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                const testDelegateCallReceiver = await (await hre.ethers.getContractFactory("TestDelegateCallReverter")).deploy();

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModuleWithRootAccess")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), true]);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                // TODO: Replace with builder function
                const safeTx = {
                    action: {
                        to: await testDelegateCallReceiver.getAddress(),
                        value: hre.ethers.parseEther("1"),
                        data: "0x",
                    },
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolMediator,
                    "RootAccessActionExecutionFailed",
                );
            });

            it("Should emit ModuleRequiresRootAccess for a root access module", async () => {
                const { safeProtocolMediator, safe } = await loadFixture(deployContractsFixture);

                const testDelegateCallReceiver = await (await hre.ethers.getContractFactory("TestDelegateCallReverter")).deploy();

                // Enable module
                const module = await (await hre.ethers.getContractFactory("TestModuleWithRootAccess")).deploy();
                const data = safeProtocolMediator.interface.encodeFunctionData("enableModule", [await module.getAddress(), false]);
                // Required to set module to indicate that it does not require root access
                await module.setRequiresRootAccess(false);
                await safe.exec(await safeProtocolMediator.getAddress(), 0, data);

                // Set root access flag back to true
                await module.setRequiresRootAccess(true);

                // TODO: Replace with builder function
                const safeTx = {
                    action: {
                        to: await testDelegateCallReceiver.getAddress(),
                        value: hre.ethers.parseEther("1"),
                        data: "0x",
                    },
                    nonce: 1,
                    metaHash: hre.ethers.randomBytes(32),
                };

                await expect(module.executeFromModule(safeProtocolMediator, safe, safeTx))
                    .to.be.revertedWithCustomError(safeProtocolMediator, "ModuleRequiresRootAccess")
                    .withArgs(await module.getAddress());
            });
        });
    });
});
