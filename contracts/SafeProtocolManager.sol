// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;
import {ISafeProtocolManager} from "./interfaces/Manager.sol";
import {ISafeProtocolPlugin, ISafeProtocolHooks} from "./interfaces/Integrations.sol";

import {ISafe} from "./interfaces/Accounts.sol";
import {SafeProtocolAction, SafeTransaction, SafeRootAccess} from "./DataTypes.sol";
import {ISafeProtocolRegistry} from "./interfaces/Registry.sol";
import {RegistryManager} from "./base/RegistryManager.sol";
import {HooksManager} from "./base/HooksManager.sol";
import {Enum} from "./common/Enum.sol";

/**
 * @title SafeProtocolManager contract allows Safe users to set plugin through a Manager rather than directly enabling a plugin on Safe.
 *        Users have to first enable SafeProtocolManager as a plugin on a Safe and then enable other plugins through the mediator.
 */
contract SafeProtocolManager is ISafeProtocolManager, RegistryManager, HooksManager {
    address internal constant SENTINEL_MODULES = address(0x1);

    /**
     * @notice Mapping of a mapping what stores information about plugins that are enabled per Safe.
     *         address (Safe address) => address (integration address) => EnabledPluginInfo
     */
    mapping(address => mapping(address => PluginAccessInfo)) public enabledPlugins;
    struct PluginAccessInfo {
        bool rootAddressGranted;
        address nextPluginPointer;
    }

    // Events
    event ActionsExecuted(address indexed safe, bytes32 metadataHash, uint256 nonce);
    event RootAccessActionExecuted(address indexed safe, bytes32 metadataHash);
    event PluginEnabled(address indexed safe, address indexed plugin, bool allowRootAccess);
    event PluginDisabled(address indexed safe, address indexed plugin);

    // Errors
    error PluginRequiresRootAccess(address sender);
    error PluginNotEnabled(address plugin);
    error PluginEnabledOnlyForRootAccess(address plugin);
    error PluginAccessMismatch(address plugin, bool requiresRootAccess, bool providedValue);
    error ActionExecutionFailed(address safe, bytes32 metadataHash, uint256 index);
    error RootAccessActionExecutionFailed(address safe, bytes32 metadataHash);
    error PluginAlreadyEnabled(address safe, address plugin);
    error InvalidPluginAddress(address plugin);
    error InvalidPrevPluginAddress(address plugin);
    error ZeroPageSizeNotAllowed();
    error InvalidToFieldInSafeProtocolAction(address safe, bytes32 metadataHash, uint256 index);

    modifier onlyEnabledPlugin(address safe) {
        if (enabledPlugins[safe][msg.sender].nextPluginPointer == address(0)) {
            revert PluginNotEnabled(msg.sender);
        }
        _;
    }

    modifier noZeroOrSentinelPlugin(address plugin) {
        if (plugin == address(0) || plugin == SENTINEL_MODULES) {
            revert InvalidPluginAddress(plugin);
        }
        _;
    }

    constructor(address initialOwner, address _registry) RegistryManager(_registry, initialOwner) {}


     /**
     * @notice Implement BaseGuard interface to allow an account to add Manager as a guard for existing Safe accounts (upto version 1.5.x).
     * @dev An account must enable SafeProtocolManager as a Guard (for Safe v1.x) and enable a contract address as Hooks.
     *      If there is no hooks enabled for the Safe, transaction will pass through without any checks.
     * @param to address of the account
     * @param value Amount of ETH to be sent
     * @param data Artibtrary length bytes containing payload
     * @param operation Call or DelegateCall operation
     * @param safeTxGas uint256
     * @param baseGas uint256
     * @param gasPrice uint256
     * @param gasToken address
     * @param refundReceiver payable address
     * @param signatures Arbitrary bytes containing ECDSA signatures
     * @param msgSender Sender of the transaction
     */
    function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external {
        // Store hooks address in tempHooksAddress so that checkAfterExecution(...) can access it.
        // A temprary storage is required to use old hooks in checkAfterExecution if hooks get updated in between transaction
        tempHooksData[msg.sender].hooksAddress = enabledHooks[msg.sender];
        address tempHooksAddressForAccount = enabledHooks[msg.sender];

        if (tempHooksAddressForAccount == address(0)) return;
        bytes memory executionMetadata = abi.encode(
            to,
            value,
            data,
            safeTxGas,
            baseGas,
            gasPrice,
            gasToken,
            refundReceiver,
            signatures,
            msgSender
        );

        if (operation == Enum.Operation.Call) {
            SafeProtocolAction[] memory actions = new SafeProtocolAction[](1);
            actions[0] = SafeProtocolAction(payable(to), value, data);
            SafeTransaction memory safeTx = SafeTransaction(actions, 0, "");
            tempHooksData[msg.sender].preCheckData = ISafeProtocolHooks(tempHooksAddressForAccount).preCheck(
                ISafe(msg.sender),
                safeTx,
                0,
                executionMetadata
            );
        } else {
            // Using else instead of "else if(operation == Enum.Operation.DelegateCall)" to reduce gas usage
            // because accounts must only allow Call and DelegateCall operations.
            SafeProtocolAction memory action = SafeProtocolAction(payable(to), value, data);
            SafeRootAccess memory safeTx = SafeRootAccess(action, 0, "");
            tempHooksData[msg.sender].preCheckData = ISafeProtocolHooks(tempHooksAddressForAccount).preCheckRootAccess(
                ISafe(msg.sender),
                safeTx,
                0,
                executionMetadata
            );
        }
    }

    function checkModuleTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        address module /* onlyPermittedPlugin(module) uncomment this? */ // Use term plugin?
    ) external returns (bytes32 moduleTxHash) {
        // Store hooks address in tempHooksAddress so that checkAfterExecution(...) can access it.
        // A temprary storage is required to use old hooks in checkAfterExecution if hooks get updated in between transaction
        tempHooksData[msg.sender].hooksAddress = enabledHooks[msg.sender];
        address tempHooksAddressForSafe = enabledHooks[msg.sender];

        moduleTxHash = keccak256(abi.encode(to, value, data, operation, module));
        if (tempHooksAddressForSafe == address(0)) return moduleTxHash;

        if (operation == Enum.Operation.Call) {
            SafeProtocolAction[] memory actions = new SafeProtocolAction[](1);
            actions[0] = SafeProtocolAction(payable(to), value, data);
            SafeTransaction memory safeTx = SafeTransaction(actions, 0, "");
            ISafeProtocolHooks(tempHooksAddressForSafe).preCheck(ISafe(msg.sender), safeTx, 1, abi.encode(module));
        } else {
            // Using else instead of "else if(operation == Enum.Operation.DelegateCall)" to reduce gas usage
            // and Safe allows only Call and DelegateCall operations.
            SafeProtocolAction memory action = SafeProtocolAction(payable(to), value, data);
            SafeRootAccess memory safeTx = SafeRootAccess(action, 0, "");
            ISafeProtocolHooks(tempHooksAddressForSafe).preCheckRootAccess(ISafe(msg.sender), safeTx, 1, abi.encode(module));
        }

        return moduleTxHash;
    }


       function checkAfterExecution(bytes32, bool success) external {
        address tempHooksAddressForSafe = tempHooksData[msg.sender].hooksAddress;
        if (tempHooksAddressForSafe == address(0)) return;

        // Use tempHooksAddress to avoid a case where hooks get updated in the middle of a transaction.
        ISafeProtocolHooks(tempHooksAddressForSafe).postCheck(ISafe(msg.sender), success, tempHooksData[msg.sender].preCheckData);

        // Reset to address(0) so that there is no unattended storage
        tempHooksData[msg.sender].hooksAddress = address(0);
        tempHooksData[msg.sender].preCheckData = bytes("");
    }


    /**
     * @notice This function executes non-delegate call(s) on a safe if the plugin is enabled on the Safe.
     *         If any one of the actions fail, the transaction reverts.
     * @dev Restrict the `to` field in the actions so that a module cannot execute an action that changes the config such as
     *      enabling/disabling other modules or make changes to its own access level for a Safe.
     *      In future, evaluate use of fine granined permissions model executing actions.
     *      For more information, follow the disuccsion here: https://github.com/5afe/safe-protocol-specs/discussions/7.
     * @param safe A Safe instance
     * @param transaction A struct of type SafeTransaction containing information of about the action(s) to be executed.
     *                    Users can add logic to validate metadataHash through hooks.
     * @return data bytes types containing the result of the executed action.
     */
    function executeTransaction(
        ISafe safe,
        SafeTransaction calldata transaction
    ) external override onlyEnabledPlugin(address(safe)) onlyPermittedPlugin(msg.sender) returns (bytes[] memory data) {
        address safeAddress = address(safe);

        address hooksAddress = enabledHooks[safeAddress];
        bool areHooksEnabled = hooksAddress != address(0);
        bytes memory preCheckData;
        if (areHooksEnabled) {
            // TODO: Define execution metadata
            // executionType = 1 for plugin flow
            preCheckData = ISafeProtocolHooks(hooksAddress).preCheck(safe, transaction, 1, "");
        }

        data = new bytes[](transaction.actions.length);
        uint256 length = transaction.actions.length;
        for (uint256 i = 0; i < length; ++i) {
            SafeProtocolAction calldata safeProtocolAction = transaction.actions[i];

            if (safeProtocolAction.to == address(this) || safeProtocolAction.to == safeAddress) {
                revert InvalidToFieldInSafeProtocolAction(safeAddress, transaction.metadataHash, i);
            }

            (bool isActionSuccessful, bytes memory resultData) = safe.execTransactionFromModuleReturnData(
                safeProtocolAction.to,
                safeProtocolAction.value,
                safeProtocolAction.data,
                0
            );

            // Even if one action fails, revert the transaction.
            if (!isActionSuccessful) {
                revert ActionExecutionFailed(safeAddress, transaction.metadataHash, i);
            } else {
                data[i] = resultData;
            }
        }
        if (areHooksEnabled) {
            // success = true because if transaction is not revereted till here, all actions executed successfully.
            ISafeProtocolHooks(hooksAddress).postCheck(ISafe(safe), true, preCheckData);
        }
        emit ActionsExecuted(safeAddress, transaction.metadataHash, transaction.nonce);
    }

    /**
     * @notice This function executes a delegate call on a safe if the plugin is enabled and
     *         root access it granted.
     * @param safe A Safe instance
     * @param rootAccess A struct of type SafeRootAccess containing information of about the action to be executed.
     *                   Users can add logic to validate metadataHash through hooks.
     * @return data bytes types containing the result of the executed action.
     */
    function executeRootAccess(
        ISafe safe,
        SafeRootAccess calldata rootAccess
    ) external override onlyEnabledPlugin(address(safe)) onlyPermittedPlugin(msg.sender) returns (bytes memory data) {
        SafeProtocolAction calldata safeProtocolAction = rootAccess.action;
        address safeAddress = address(safe);

        address hooksAddress = enabledHooks[safeAddress];
        bool areHooksEnabled = hooksAddress != address(0);
        bytes memory preCheckData;
        if (areHooksEnabled) {
            // TODO: Define execution metadata
            // executionType = 1 for plugin flow
            preCheckData = ISafeProtocolHooks(hooksAddress).preCheckRootAccess(safe, rootAccess, 1, "");
        }
        if (!ISafeProtocolPlugin(msg.sender).requiresRootAccess() || !enabledPlugins[safeAddress][msg.sender].rootAddressGranted) {
            revert PluginRequiresRootAccess(msg.sender);
        }

        bool success;
        (success, data) = safe.execTransactionFromModuleReturnData(
            safeProtocolAction.to,
            safeProtocolAction.value,
            safeProtocolAction.data,
            1
        );

        if (areHooksEnabled) {
            // success = true because if transaction is not revereted till here, all actions executed successfully.
            ISafeProtocolHooks(hooksAddress).postCheck(ISafe(safe), success, preCheckData);
        }

        if (success) {
            emit RootAccessActionExecuted(safeAddress, rootAccess.metadataHash);
        } else {
            revert RootAccessActionExecutionFailed(safeAddress, rootAccess.metadataHash);
        }
    }

    /**
     * @notice Called by a Safe to enable a plugin on a Safe. To be called by a safe.
     * @param plugin ISafeProtocolPlugin A plugin that has to be enabled
     * @param allowRootAccess Bool indicating whether root access to be allowed.
     */
    function enablePlugin(address plugin, bool allowRootAccess) virtual external noZeroOrSentinelPlugin(plugin) onlyPermittedPlugin(plugin) {
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
     * @notice Disable a plugin. This function should be called by Safe.
     * @param plugin Plugin to be disabled
     */
    function disablePlugin(address prevPlugin, address plugin) external noZeroOrSentinelPlugin(plugin) {
        PluginAccessInfo storage prevPluginInfo = enabledPlugins[msg.sender][prevPlugin];
        PluginAccessInfo storage pluginInfo = enabledPlugins[msg.sender][plugin];

        if (prevPluginInfo.nextPluginPointer != plugin) {
            revert InvalidPrevPluginAddress(prevPlugin);
        }

        prevPluginInfo = pluginInfo;

        pluginInfo.nextPluginPointer = address(0);
        pluginInfo.rootAddressGranted = false;
        emit PluginDisabled(msg.sender, plugin);
    }

    /**
     * @notice A view only function to get information about safe and a plugin
     * @param safe Address of a safe
     * @param plugin Address of a plugin
     */
    function getPluginInfo(address safe, address plugin) external view returns (PluginAccessInfo memory enabled) {
        return enabledPlugins[safe][plugin];
    }

    /**
     * @notice Returns if an plugin is enabled
     * @return True if the plugin is enabled
     */
    function isPluginEnabled(address safe, address plugin) public view returns (bool) {
        return SENTINEL_MODULES != plugin && enabledPlugins[safe][plugin].nextPluginPointer != address(0);
    }

    /**
     * @notice Returns an array of plugins enabled for a Safe address.
     *         If all entries fit into a single page, the next pointer will be 0x1.
     *         If another page is present, next will be the last element of the returned array.
     * @param start Start of the page. Has to be a plugin or start pointer (0x1 address)
     * @param pageSize Maximum number of plugins that should be returned. Has to be > 0
     * @return array Array of plugins.
     * @return next Start of the next page.
     */
    function getPluginsPaginated(
        address start,
        uint256 pageSize,
        address safe
    ) external view returns (address[] memory array, address next) {
        if (pageSize == 0) {
            revert ZeroPageSizeNotAllowed();
        }

        if (!(start == SENTINEL_MODULES || isPluginEnabled(safe, start))) {
            revert InvalidPluginAddress(start);
        }
        // Init array with max page size
        array = new address[](pageSize);

        // Populate return array
        uint256 pluginCount = 0;
        next = enabledPlugins[safe][start].nextPluginPointer;
        while (next != address(0) && next != SENTINEL_MODULES && pluginCount < pageSize) {
            array[pluginCount] = next;
            next = enabledPlugins[safe][next].nextPluginPointer;
            pluginCount++;
        }

        // This check is required because the enabled plugin list might not be initialised yet. e.g. no enabled plugins for a safe ever before
        if (pluginCount == 0) {
            next = SENTINEL_MODULES;
        }

        /**
          Because of the argument validation, we can assume that the loop will always iterate over the valid plugin list values
          and the `next` variable will either be an enabled plugin or a sentinel address (signalling the end). 
          
          If we haven't reached the end inside the loop, we need to set the next pointer to the last element of the plugins array
          because the `next` variable (which is a plugin by itself) acting as a pointer to the start of the next page is neither 
          included to the current page, nor will it be included in the next one if you pass it as a start.
        */
        if (next != SENTINEL_MODULES && pluginCount != 0) {
            next = array[pluginCount - 1];
        }
        // Set correct size of returned array
        // solhint-disable-next-line no-inline-assembly
        assembly {
            mstore(array, pluginCount)
        }
    }
}
