// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;
import {SafeProtocolManager} from "../SafeProtocolManager.sol";
import {ISafeProtocolPlugin, ISafeProtocolHooks} from "../interfaces/Integrations.sol";
import {ISafeProtocolRegistryAttested} from "../interfaces/RegistryAttested.sol";

/**
 * @title This is a test version of SafeProtocolManager and should use TestSafeProtocolRegistryUnrestricted contract as resgistry.
 */


contract SafeProtocolManagerAttestation is SafeProtocolManager {

    modifier onlyVerifiedModule(address plugin) {
        // Only allow attested, registered and non-flagged plugins
        (uint64 listedAt, uint64 flaggedAt, bytes32 attestationId) = ISafeProtocolRegistryAttested(registry).checkAttest(plugin);
        if (plugin != address(0) && (listedAt == 0 || flaggedAt != 0 || attestationId == 0)) {
            revert("Module not attested");
        }
        _;
    }

    constructor(address initialOwner, address registry) SafeProtocolManager(initialOwner, registry) {}


        /**
     * @notice Called by a Safe to enable a plugin on a Safe. To be called by a safe.
     * @param plugin ISafeProtocolPlugin A plugin that has to be enabled
     * @param allowRootAccess Bool indicating whether root access to be allowed.
     */
    function enablePlugin(address plugin, bool allowRootAccess) external override noZeroOrSentinelPlugin(plugin) onlyPermittedPlugin(plugin)  onlyVerifiedModule(plugin)  {
        PluginAccessInfo storage senderSentinelPlugin = enabledPlugins[msg.sender][SENTINEL_MODULES];
        PluginAccessInfo storage senderPlugin = enabledPlugins[msg.sender][plugin];

        if (senderPlugin.nextPluginPointer != address(0)) {
            revert PluginAlreadyEnabled(msg.sender, plugin);
        }

        bool requiresRootAccess = ISafeProtocolPlugin(plugin).requiresRootAccess();
        if (allowRootAccess != requiresRootAccess) {
            revert PluginAccessMismatch(plugin, requiresRootAccess, allowRootAccess);
        }

        if (senderSentinelPlugin.nextPluginPointer == address(0)) {
            senderSentinelPlugin.rootAddressGranted = false;
            senderSentinelPlugin.nextPluginPointer = SENTINEL_MODULES;
        }

        senderPlugin.nextPluginPointer = senderSentinelPlugin.nextPluginPointer;
        senderPlugin.rootAddressGranted = allowRootAccess;
        senderSentinelPlugin.nextPluginPointer = plugin;

        emit PluginEnabled(msg.sender, plugin, allowRootAccess);
    }


        /**
     * @notice Sets hooks on an account. If Zero address is set, manager will not perform pre and post checks for on Safe transaction.
     * @param hooks Address of the hooks to be enabled for msg.sender.
     */
    function setHooks(address hooks) external override  onlyVerifiedModule(hooks)  {
        if (hooks != address(0) && !ISafeProtocolHooks(hooks).supportsInterface(type(ISafeProtocolHooks).interfaceId)) {
            revert AddressDoesNotImplementHooksInterface(hooks);
        }
        enabledHooks[msg.sender] = hooks;
        emit HooksChanged(msg.sender, hooks);
    }

}