// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;
import {SafeProtocolManager} from "../SafeProtocolManager.sol";
import {ISafeProtocolPlugin, ISafeProtocolHooks} from "../interfaces/Modules.sol";
import {ISafeProtocolRegistryAttested} from "../interfaces/RegistryAttested.sol";
import {MODULE_TYPE_PLUGIN, MODULE_TYPE_HOOKS} from "../common/Constants.sol";

/**
 * @title This is a test version of SafeProtocolManager and should use TestSafeProtocolRegistryUnrestricted contract as resgistry.
 */

 
contract SafeProtocolManagerAttestation is SafeProtocolManager {

    modifier onlyAttestedPlugin(address plugin) {
        // Only allow attested, registered and non-flagged plugins
        (uint64 listedAt, uint64 flaggedAt, bytes32 attestationId) = ISafeProtocolRegistryAttested(registry).checkAttest(plugin);
        if (listedAt == 0 || flaggedAt != 0 || attestationId == 0) {
            revert ModuleNotPermitted(plugin, listedAt, flaggedAt, MODULE_TYPE_PLUGIN);
        }
        _;
    }

    constructor(address initialOwner, address registry) SafeProtocolManager(initialOwner, registry) {}

        /**
     * @notice Enables a plugin for an account. Must be called by the account.
     * @param plugin ISafeProtocolPlugin A plugin that has to be enabled
     * @param permissions uint8 indicating permissions granted to the plugin.
     */
     
        /**
     * @notice Enables a plugin for an account. Must be called by the account.
     * @param plugin ISafeProtocolPlugin A plugin that has to be enabled
     * @param permissions uint8 indicating permissions granted to the plugin.
     */
    function enablePlugin(
        address plugin,
        uint8 permissions
    ) external override virtual noZeroOrSentinelPlugin(plugin) onlyPermittedModule(plugin, MODULE_TYPE_PLUGIN) onlyAttestedPlugin(plugin) onlyAccount {
        // address(0) check omitted because it is not expected to enable it as a plugin and
        // call to it would fail. Additionally, registry should not permit address(0) as an module.
        if (!ISafeProtocolPlugin(plugin).supportsInterface(type(ISafeProtocolPlugin).interfaceId))
            revert ContractDoesNotImplementValidInterfaceId(plugin);

        PluginAccessInfo storage senderSentinelPlugin = enabledPlugins[msg.sender][SENTINEL_MODULES];
        PluginAccessInfo storage senderPlugin = enabledPlugins[msg.sender][plugin];

        if (senderPlugin.nextPluginPointer != address(0)) {
            revert PluginAlreadyEnabled(msg.sender, plugin);
        }

        uint8 requiresPermissions = ISafeProtocolPlugin(plugin).requiresPermissions();
        if (permissions != requiresPermissions) {
            revert PluginPermissionsMismatch(plugin, requiresPermissions, permissions);
        }

        if (senderSentinelPlugin.nextPluginPointer == address(0)) {
            senderSentinelPlugin.nextPluginPointer = SENTINEL_MODULES;
        }

        senderPlugin.nextPluginPointer = senderSentinelPlugin.nextPluginPointer;
        senderPlugin.permissions = permissions;
        senderSentinelPlugin.nextPluginPointer = plugin;

        emit PluginEnabled(msg.sender, plugin, permissions);
    }

    function setHooks(address hooks) override external onlyAccount onlyAttestedPlugin(hooks) {
        if (hooks != address(0)) {
            checkPermittedModule(hooks, MODULE_TYPE_HOOKS);
            if (!ISafeProtocolHooks(hooks).supportsInterface(type(ISafeProtocolHooks).interfaceId))
                revert ContractDoesNotImplementValidInterfaceId(hooks);
        }
        enabledHooks[msg.sender] = hooks;
        emit HooksChanged(msg.sender, hooks);
    }

}
