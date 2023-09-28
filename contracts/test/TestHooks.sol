// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;

import {IAccount} from "../interfaces/Accounts.sol";
import {ISafeProtocolHooks} from "../interfaces/Modules.sol";
import {ISafeProtocolManager} from "../interfaces/Manager.sol";
import {SafeTransaction, SafeRootAccess} from "../DataTypes.sol";
import {PLUGIN_PERMISSION_NONE, PLUGIN_PERMISSION_EXECUTE_CALL, PLUGIN_PERMISSION_EXECUTE_DELEGATECALL} from "../common/Constants.sol";

abstract contract BaseTestHooks is ISafeProtocolHooks {
    string public name = "";
    string public version = "";

    function supportsInterface(bytes4 interfaceId) external view override returns (bool) {
        return interfaceId == type(ISafeProtocolHooks).interfaceId || interfaceId == 0x01ffc9a7;
    }
}

contract TestHooks is BaseTestHooks {

      function preCheck(
        address account,
        SafeTransaction calldata tx,
        uint256 executionType,
        bytes calldata executionMeta
    ) external returns (bytes memory preCheckData) {

    }

    /**
     * @notice A function that will be called before the execution of a transaction if the hooks are enabled and
     *         transaction requies root access.
     * @dev Add custom logic in this function to validate the pre-state and contents of transaction for root access.
     * @param account Address of the account
     * @param rootAccess DataTypes.SafeRootAccess
     * @param executionType uint256
     * @param executionMeta bytes
     * @return preCheckData bytes
     */
    function preCheckRootAccess(
        address account,
        SafeRootAccess calldata rootAccess,
        uint256 executionType,
        bytes calldata executionMeta
    ) external returns (bytes memory preCheckData) {

    }

    /**
     * @notice A function that will be called after the execution of a transaction if the hooks are enabled. Hooks should revert if the post state of after the transaction is not as expected.
     * @dev Add custom logic in this function to validate the post-state after the transaction is executed.
     * @param account Address of the account
     * @param success bool
     * @param preCheckData Arbitrary length bytes that was returned by during pre-check of the transaction.
     */
    function postCheck(address account, bool success, bytes calldata preCheckData) external {}
}


