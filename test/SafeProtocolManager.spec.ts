import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ZeroAddress } from "ethers";
import { SENTINEL_MODULES } from "./utils/constants";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { buildRootTx, buildSingleTx } from "./utils/builder";
import { getHooksWithFailingPrechecks, getHooksWithPassingChecks, getHooksWithFailingPostCheck } from "./utils/mockHooksBuilder";
import { IntegrationType } from "./utils/constants";

describe("SafeProtocolManager", async () => {
    let deployer: SignerWithAddress, owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress;

    before(async () => {
        [deployer, owner, user1] = await hre.ethers.getSigners();
    });

    async function deployContractsFixture() {
        [deployer, owner, user1, user2] = await hre.ethers.getSigners();
        const safeProtocolRegistry = await hre.ethers.deployContract("SafeProtocolRegistry", [owner.address]);
        const safe = await hre.ethers.deployContract("TestExecutor");
        const safeProtocolManager = await (
            await hre.ethers.getContractFactory("SafeProtocolManager")
        ).deploy(owner.address, await safeProtocolRegistry.getAddress());

        return { safeProtocolManager, safeProtocolRegistry, safe };
    }

    describe("Setup manager", async () => {
        it("Should set manager as a plugin for a safe", async () => {
            const safe = await hre.ethers.deployContract("TestExecutor");
            const { safeProtocolManager } = await loadFixture(deployContractsFixture);
            expect(await safe.setModule(await safeProtocolManager.getAddress()));
        });
    });

    describe("Plugins", async () => {
        async function deployContractsWithPluginFixture() {
            const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsFixture);
            const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
            await safeProtocolRegistry.connect(owner).addIntegration(plugin, IntegrationType.Plugin);
            return { safeProtocolManager, safe, plugin, safeProtocolRegistry };
        }

        describe("Test enable plugin", async () => {
            it("Should not allow a Safe to enable zero address plugin", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [hre.ethers.ZeroAddress, false]);
                await expect(safe.exec(await safeProtocolManager.getAddress(), 0, data))
                    .to.be.revertedWithCustomError(safeProtocolManager, "InvalidPluginAddress")
                    .withArgs(hre.ethers.ZeroAddress);
            });

            it("Should not allow a Safe to enable plugin if not added as a integration in registry", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                const pluginAddress = await (await (await hre.ethers.getContractFactory("TestPlugin")).deploy()).getAddress();

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await expect(safe.exec(await safeProtocolManager.getAddress(), 0, data))
                    .to.be.revertedWithCustomError(safeProtocolManager, "PluginNotPermitted")
                    .withArgs(pluginAddress, 0, 0);
            });

            it("Should not allow a Safe to enable plugin if flagged in registry", async () => {
                const { safeProtocolManager, safe, plugin, safeProtocolRegistry } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                await safeProtocolRegistry.connect(owner).flagIntegration(plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await expect(safe.exec(await safeProtocolManager.getAddress(), 0, data)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginNotPermitted",
                );
            });

            it("Should not allow a Safe to enable SENTINEL_MODULES plugin", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithPluginFixture);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [SENTINEL_MODULES, false]);
                await expect(safe.exec(await safeProtocolManager.getAddress(), 0, data))
                    .to.be.revertedWithCustomError(safeProtocolManager, "InvalidPluginAddress")
                    .withArgs(SENTINEL_MODULES);
            });

            it("Should allow a Safe to enable a plugin through a manager", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);
                const pluginAddress = await plugin.getAddress();
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);
                expect(await safeProtocolManager.getPluginInfo(await safe.getAddress(), pluginAddress)).to.eql([false, SENTINEL_MODULES]);
            });

            it("Should fail to enable a plugin (with non root access) with root access", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                const pluginAddress = await plugin.getAddress();

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, true]);

                await expect(safe.exec(await safeProtocolManager.getAddress(), 0, data)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginAccessMismatch",
                );
                expect(await safeProtocolManager.getPluginInfo(await safe.getAddress(), pluginAddress)).to.eql([false, ZeroAddress]);
            });
        });

        describe("Test disable plugin", async () => {
            it("Should not allow a Safe to disable zero address plugin", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                const data = safeProtocolManager.interface.encodeFunctionData("disablePlugin", [
                    hre.ethers.ZeroAddress,
                    hre.ethers.ZeroAddress,
                ]);
                await expect(safe.exec(await safeProtocolManager.getAddress(), 0, data))
                    .to.be.revertedWithCustomError(safeProtocolManager, "InvalidPluginAddress")
                    .withArgs(hre.ethers.ZeroAddress);
            });

            it("Should not allow a Safe to disable SENTINEL_MODULES plugin", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithPluginFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("disablePlugin", [SENTINEL_MODULES, SENTINEL_MODULES]);
                await expect(safe.exec(safeProtocolManagerAddress, 0, data))
                    .to.be.revertedWithCustomError(safeProtocolManager, "InvalidPluginAddress")
                    .withArgs(SENTINEL_MODULES);
            });

            it("Should revert if nexPluginPtr and plugin address do not match", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("disablePlugin", [
                    SENTINEL_MODULES,
                    await plugin.getAddress(),
                ]);
                await expect(safe.exec(safeProtocolManagerAddress, 0, data))
                    .to.be.revertedWithCustomError(safeProtocolManager, "InvalidPrevPluginAddress")
                    .withArgs(SENTINEL_MODULES);
            });

            it("Should disable a plugin", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();
                const safeAddress = await safe.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);
                expect(await safeProtocolManager.getPluginInfo(safeAddress, pluginAddress)).to.eql([false, SENTINEL_MODULES]);

                const data2 = safeProtocolManager.interface.encodeFunctionData("disablePlugin", [SENTINEL_MODULES, pluginAddress]);
                await safe.exec(safeProtocolManagerAddress, 0, data2);
                expect(await safeProtocolManager.getPluginInfo(safeAddress, pluginAddress)).to.eql([false, ZeroAddress]);
            });

            it("Should not allow enabling plugin if already enabled", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);
                expect(await safeProtocolManager.getPluginInfo(await safe.getAddress(), pluginAddress)).to.eql([false, SENTINEL_MODULES]);

                await expect(safe.exec(safeProtocolManagerAddress, 0, data)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginAlreadyEnabled",
                );
            });
        });

        describe("Get paginated list of plugins", async () => {
            it("Should revert with InvalidPluginAddress", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);

                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                await expect(safeProtocolManager.getPluginsPaginated.staticCall(pluginAddress, 1, safe))
                    .to.be.revertedWithCustomError(safeProtocolManager, "InvalidPluginAddress")
                    .withArgs(pluginAddress);
            });

            it("Should revert with InvalidPageSize", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                await expect(
                    safeProtocolManager.getPluginsPaginated.staticCall(await plugin.getAddress(), 0, safe),
                ).to.be.revertedWithCustomError(safeProtocolManager, "ZeroPageSizeNotAllowed");
            });

            it("Should return empty list if no plugins are enabled", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithPluginFixture);
                await safe.setModule(await safeProtocolManager.getAddress());
                expect(await safeProtocolManager.getPluginsPaginated.staticCall(SENTINEL_MODULES, 1, safe)).to.eql([[], SENTINEL_MODULES]);
            });

            it("Should return list with one plugin", async () => {
                const { safeProtocolManager, safe, plugin } = await loadFixture(deployContractsWithPluginFixture);

                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);
                await safeProtocolManager.getPluginInfo(await safe.getAddress(), pluginAddress);
                expect(await safeProtocolManager.getPluginsPaginated.staticCall(SENTINEL_MODULES, 1, safe)).to.eql([
                    [pluginAddress],
                    SENTINEL_MODULES,
                ]);
            });

            it("Should return list with 2 plugins starting from sentinel address", async () => {
                const { safeProtocolManager, safe, plugin, safeProtocolRegistry } = await loadFixture(deployContractsWithPluginFixture);

                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);

                const plugin2 = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                const plugin2Address = await plugin2.getAddress();

                await safeProtocolRegistry.connect(owner).addIntegration(plugin2Address, IntegrationType.Plugin);
                const data2 = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [plugin2Address, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data2);

                expect(await safeProtocolManager.getPluginsPaginated.staticCall(SENTINEL_MODULES, 10, safe)).to.eql([
                    [plugin2Address, pluginAddress],
                    SENTINEL_MODULES,
                ]);
            });

            it("Should return list with 1 plugin starting from non-sentinel address", async () => {
                const { safeProtocolManager, safe, plugin, safeProtocolRegistry } = await loadFixture(deployContractsWithPluginFixture);

                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);

                const plugin2 = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                const plugin2Address = await plugin2.getAddress();
                await safeProtocolRegistry.connect(owner).addIntegration(plugin2Address, IntegrationType.Plugin);
                const data2 = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [plugin2Address, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data2);
                expect(await safeProtocolManager.getPluginsPaginated.staticCall(plugin2Address, 10, safe)).to.eql([
                    [pluginAddress],
                    SENTINEL_MODULES,
                ]);
            });

            it("Should return list with 1 plugin when called with pageSize 1", async () => {
                const { safeProtocolManager, safe, plugin, safeProtocolRegistry } = await loadFixture(deployContractsWithPluginFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                const pluginAddress = await plugin.getAddress();

                await safe.setModule(safeProtocolManagerAddress);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);
                const plugin2Address = await (await (await hre.ethers.getContractFactory("TestPlugin")).deploy()).getAddress();

                await safeProtocolRegistry.connect(owner).addIntegration(plugin2Address, IntegrationType.Plugin);
                const data2 = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [plugin2Address, false]);

                await safe.exec(await safeProtocolManager.getAddress(), 0, data2);
                expect(await safeProtocolManager.getPluginsPaginated.staticCall(SENTINEL_MODULES, 1, safe)).to.eql([
                    [plugin2Address],
                    plugin2Address,
                ]);

                expect(await safeProtocolManager.getPluginsPaginated.staticCall(plugin2Address, 1, safe)).to.eql([
                    [pluginAddress],
                    SENTINEL_MODULES,
                ]);
            });
        });
    });

    describe("Execute transaction from plugin", async () => {
        async function deployContractsWithEnabledManagerFixture() {
            const { safeProtocolManager, safeProtocolRegistry, safe } = await loadFixture(deployContractsFixture);
            await safe.setModule(await safeProtocolManager.getAddress());
            return { safeProtocolManager, safe, safeProtocolRegistry };
        }

        describe("Plugin with non-root access", async () => {
            it("Should not allow non-enabled plugin to execute tx from a safe", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                const safeTx = buildSingleTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginNotEnabled",
                );
            });

            it("Should process a SafeTransaction and transfer ETH from safe to an EOA", async function () {
                const { safeProtocolManager, safeProtocolRegistry, safe } = await loadFixture(deployContractsWithEnabledManagerFixture);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);
                const safeAddress = await safe.getAddress();
                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: safeAddress,
                        value: amount,
                    })
                ).wait();
                const safeTx = buildSingleTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));

                const balanceBefore = await hre.ethers.provider.getBalance(user1.address);
                const tx = await plugin.executeFromPlugin(safeProtocolManager, safe, safeTx);
                await tx.wait();
                const balanceAfter = await hre.ethers.provider.getBalance(user1.address);

                expect(balanceAfter).to.eql(balanceBefore + amount);
                expect(await hre.ethers.provider.getBalance(safeAddress)).to.eql(0n);

                await expect(tx).to.emit(safeProtocolManager, "ActionsExecuted").withArgs(safeAddress, safeTx.metadataHash, 1);
            });

            it("Should revert with a InvalidToFieldInSafeProtocolAction when `to` address is safe address through which tx is executed", async function () {
                const { safeProtocolManager, safeProtocolRegistry, safe } = await loadFixture(deployContractsWithEnabledManagerFixture);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);
                const safeAddress = await safe.getAddress();
                const safeTx = buildSingleTx(safeAddress, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "InvalidToFieldInSafeProtocolAction",
                );
            });

            it("Should revert with a InvalidToFieldInSafeProtocolAction when `to` address is Manager address", async function () {
                const { safeProtocolManager, safeProtocolRegistry, safe } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);
                const safeTx = buildSingleTx(
                    safeProtocolManagerAddress,
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "InvalidToFieldInSafeProtocolAction",
                );
            });

            it("Should process a SafeTransaction with hooks enabled and transfer ETH from safe to an EOA", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                // Enable hooks on a safe
                const hooks = await getHooksWithPassingChecks();
                const dataSetHooks = safeProtocolManager.interface.encodeFunctionData("setHooks", [await hooks.getAddress()]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, dataSetHooks);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);
                const safeAddress = await safe.getAddress();
                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: safeAddress,
                        value: amount,
                    })
                ).wait();
                const safeTx = buildSingleTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));

                const balanceBefore = await hre.ethers.provider.getBalance(user1.address);
                const tx = await plugin.executeFromPlugin(safeProtocolManager, safe, safeTx);
                await tx.wait();
                const balanceAfter = await hre.ethers.provider.getBalance(user1.address);

                expect(balanceAfter).to.eql(balanceBefore + amount);
                expect(await hre.ethers.provider.getBalance(safeAddress)).to.eql(0n);

                await expect(tx).to.emit(safeProtocolManager, "ActionsExecuted").withArgs(safeAddress, safeTx.metadataHash, 1);
            });

            it("Should fail executing a transaction through plugin when hooks pre-check fails", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                // Enable hooks on a safe
                const hooks = await getHooksWithFailingPrechecks();

                const dataSetHooks = safeProtocolManager.interface.encodeFunctionData("setHooks", [await hooks.getAddress()]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, dataSetHooks);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const safeTx = buildSingleTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));

                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWith("pre-check failed");
            });

            it("Should fail executing a transaction through plugin when hooks post-check fails", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();
                // Enable hooks on a safe
                const hooks = await getHooksWithFailingPostCheck();

                const dataSetHooks = safeProtocolManager.interface.encodeFunctionData("setHooks", [await hooks.getAddress()]);
                await safe.exec(safeProtocolManagerAddress, 0, dataSetHooks);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                const pluginAddress = await plugin.getAddress();

                await safeProtocolRegistry.connect(owner).addIntegration(pluginAddress, IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                await safe.exec(safeProtocolManagerAddress, 0, data);

                const safeTx = buildSingleTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));
                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: await safe.getAddress(),
                        value: amount,
                    })
                ).wait();
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWith("post-check failed");
            });

            it("Should revert with ActionExecutionFailed error if Safe doesn't have enough ETH balance", async function () {
                const { safeProtocolManager, safeProtocolRegistry, safe } = await loadFixture(deployContractsWithEnabledManagerFixture);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);
                const safeTx = {
                    actions: [
                        {
                            to: user1.address,
                            value: hre.ethers.parseEther("1"),
                            data: "0x",
                        },
                    ],
                    nonce: 1,
                    metadataHash: hre.ethers.randomBytes(32),
                };
                const balanceBefore = await hre.ethers.provider.getBalance(user1.address);

                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "ActionExecutionFailed",
                );
                const balanceAfter = await hre.ethers.provider.getBalance(user1.address);
                expect(balanceAfter).to.eql(balanceBefore);
            });

            it("Should not process a SafeTransaction if plugin is not permitted", async function () {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPlugin")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), false]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: await safe.getAddress(),
                        value: amount,
                    })
                ).wait();
                const safeTx = buildSingleTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));

                await safeProtocolRegistry.connect(owner).flagIntegration(await plugin.getAddress());
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginNotPermitted",
                );
            });
        });

        describe("Plugin with root access", async () => {
            it("Should run a transaction from root access enabled plugin", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const safeAddress = await safe.getAddress();

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiver")).deploy(user1.address);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), true]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: safeAddress,
                        value: amount,
                    })
                ).wait();

                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );

                const balanceBefore = await hre.ethers.provider.getBalance(user1.address);
                const tx = await plugin.executeFromPlugin(safeProtocolManager, safe, safeTx);
                await tx.wait();
                const balanceAfter = await hre.ethers.provider.getBalance(user1.address);

                expect(balanceAfter).to.eql(balanceBefore + amount);
                expect(await hre.ethers.provider.getBalance(safeAddress)).to.eql(0n);

                await expect(tx).to.emit(safeProtocolManager, "RootAccessActionExecuted").withArgs(safeAddress, safeTx.metadataHash);
            });

            it("Should execute a transaction from root access enabled plugin with hooks enabled", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const safeAddress = await safe.getAddress();
                // Enable hooks on a safe
                const hooks = await getHooksWithPassingChecks();
                const dataSetHooks = safeProtocolManager.interface.encodeFunctionData("setHooks", [await hooks.getAddress()]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, dataSetHooks);

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiver")).deploy(user1.address);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), true]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: safeAddress,
                        value: amount,
                    })
                ).wait();

                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );

                const balanceBefore = await hre.ethers.provider.getBalance(user1.address);
                const tx = await plugin.executeFromPlugin(safeProtocolManager, safe, safeTx);
                await tx.wait();
                const balanceAfter = await hre.ethers.provider.getBalance(user1.address);

                expect(balanceAfter).to.eql(balanceBefore + amount);
                expect(await hre.ethers.provider.getBalance(safeAddress)).to.eql(0n);

                await expect(tx).to.emit(safeProtocolManager, "RootAccessActionExecuted").withArgs(safeAddress, safeTx.metadataHash);
            });

            it("Should fail to execute a transaction from root access enabled plugin when hooks pre-check fails", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                // Enable hooks on a safe
                const hooks = await getHooksWithFailingPrechecks();

                const dataSetHooks = safeProtocolManager.interface.encodeFunctionData("setHooks", [await hooks.getAddress()]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, dataSetHooks);

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiver")).deploy(user1.address);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), true]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );

                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWith(
                    "pre-check root access failed",
                );
            });

            it("Should fail to execute a transaction from root access enabled plugin when hooks post-check fails", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const safeAddress = await safe.getAddress();
                const safeProtocolManagerAddress = await safeProtocolManager.getAddress();

                // Enable hooks on a safe
                const hooks = await getHooksWithFailingPostCheck();
                const dataSetHooks = safeProtocolManager.interface.encodeFunctionData("setHooks", [await hooks.getAddress()]);
                await safe.exec(safeProtocolManagerAddress, 0, dataSetHooks);

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiver")).deploy(user1.address);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                const pluginAddress = await plugin.getAddress();

                await safeProtocolRegistry.connect(owner).addIntegration(pluginAddress, IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, true]);
                await safe.exec(safeProtocolManagerAddress, 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: safeAddress,
                        value: amount,
                    })
                ).wait();

                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );

                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWith("post-check failed");
            });

            it("Should not allow a transaction from root access if plugin is flagged", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);

                const testDelegateCallReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiver")).deploy(user2.address);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), true]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const amount = hre.ethers.parseEther("1");
                await (
                    await deployer.sendTransaction({
                        to: await safe.getAddress(),
                        value: amount,
                    })
                ).wait();

                const safeTx = buildRootTx(
                    await testDelegateCallReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );

                await safeProtocolRegistry.connect(owner).flagIntegration(await plugin.getAddress());
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginNotPermitted",
                );
            });

            it("Should not allow non-enabled plugin to execute root tx from a safe", async () => {
                const { safeProtocolManager, safe } = await loadFixture(deployContractsWithEnabledManagerFixture);
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                const safeTx = buildRootTx(user1.address, hre.ethers.parseEther("1"), "0x", BigInt(1), hre.ethers.randomBytes(32));
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginNotEnabled",
                );
            });

            it("Should revert with PluginRequiresRootAccess if plugin indicates it doesn't need root access anymore", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiver")).deploy(user1.address);

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), true]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                await plugin.setRequiresRootAccess(false);
                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );

                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "PluginRequiresRootAccess",
                );
            });

            it("Should emit RootAccessActionExecutionFailed when root access action execution fails", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiverReverter")).deploy();

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                await safeProtocolRegistry.connect(owner).addIntegration(await plugin.getAddress(), IntegrationType.Plugin);

                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [await plugin.getAddress(), true]);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx)).to.be.revertedWithCustomError(
                    safeProtocolManager,
                    "RootAccessActionExecutionFailed",
                );
            });

            it("Should emit PluginRequiresRootAccess for root access plugin", async () => {
                const { safeProtocolManager, safe, safeProtocolRegistry } = await loadFixture(deployContractsWithEnabledManagerFixture);

                const testFallbackReceiver = await (await hre.ethers.getContractFactory("TestFallbackReceiverReverter")).deploy();

                // Enable plugin
                const plugin = await (await hre.ethers.getContractFactory("TestPluginWithRootAccess")).deploy();
                const pluginAddress = await plugin.getAddress();
                await safeProtocolRegistry.connect(owner).addIntegration(pluginAddress, IntegrationType.Plugin);
                const data = safeProtocolManager.interface.encodeFunctionData("enablePlugin", [pluginAddress, false]);
                // Required to set plugin to indicate that it does not require root access
                await plugin.setRequiresRootAccess(false);
                await safe.exec(await safeProtocolManager.getAddress(), 0, data);

                // Set root access flag back to true
                await plugin.setRequiresRootAccess(true);

                const safeTx = buildRootTx(
                    await testFallbackReceiver.getAddress(),
                    hre.ethers.parseEther("1"),
                    "0x",
                    BigInt(1),
                    hre.ethers.randomBytes(32),
                );
                await expect(plugin.executeFromPlugin(safeProtocolManager, safe, safeTx))
                    .to.be.revertedWithCustomError(safeProtocolManager, "PluginRequiresRootAccess")
                    .withArgs(pluginAddress);
            });
        });
    });
});
