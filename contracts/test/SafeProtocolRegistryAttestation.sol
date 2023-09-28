// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { IEAS, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

import {Enum} from "../common/Enum.sol";
import {SafeProtocolRegistry} from "../SafeProtocolRegistry.sol";
import {ISafeProtocolFunctionHandler, ISafeProtocolHooks, ISafeProtocolPlugin} from "../interfaces/Modules.sol";

/**
 * @title This is a test version of SafeProtocolRegistry that does not restrict any account from adding Modules.
 *        This contract is only for testing purposes and not meant for production use.
 *        The onlyOwner function modifier of `addModule(address,Enum.ModuleType)` has been removed to allow
 *        developers to add any Module to the resgistry.
 */
contract SafeProtocolRegistryAttestation is SafeProtocolRegistry {

    mapping(address => AttestationInfo) public listedAttestations;

   // Add more fields based on the discussion from EIP-7512
    struct AttestationInfo {
        bytes32 attestationId;
    }

    event ModuleAttested(address indexed module);

    error CannotAttestModule(address module);
    
    constructor(address initialOwner) SafeProtocolRegistry(initialOwner) {}

    /**
     * @notice Allows any account to add a module. A module can be any address including zero address for now.
     *         This function does not permit adding a module twice. This function validates if module supports expected interfaceId.
     * @param module Address of the module
     * @param moduleType Enum.ModuleType indicating the type of module
     */
    function addModule(address module, Enum.ModuleType moduleType) external override {
        ModuleInfo memory moduleInfo = listedModules[module];

        if (moduleInfo.listedAt != 0) {
            revert CannotAddModule(module);
        }

        // Check if module supports expected interface
        if (moduleType == Enum.ModuleType.Hooks && !IERC165(module).supportsInterface(type(ISafeProtocolHooks).interfaceId)) {
            revert ModuleDoesNotSupportExpectedInterfaceId(module, type(ISafeProtocolHooks).interfaceId);
        } else if (moduleType == Enum.ModuleType.Plugin && !IERC165(module).supportsInterface(type(ISafeProtocolPlugin).interfaceId)) {
            revert ModuleDoesNotSupportExpectedInterfaceId(module, type(ISafeProtocolPlugin).interfaceId);
        } else if (
            moduleType == Enum.ModuleType.FunctionHandler &&
            !IERC165(module).supportsInterface(type(ISafeProtocolFunctionHandler).interfaceId)
        ) {
            revert ModuleDoesNotSupportExpectedInterfaceId(module, type(ISafeProtocolFunctionHandler).interfaceId);
        }

        listedModules[module] = ModuleInfo(uint64(block.timestamp), 0, moduleType);
        emit ModuleAdded(module);
    }

        function attestModule(address module, IEAS eas, bytes32 attestation) external {

        ModuleInfo memory moduleInfo = listedModules[module];    

        if (moduleInfo.listedAt == 0 || moduleInfo.flaggedAt != 0) {
            revert CannotAttestModule(module);
        }  
            // Allow attestation to be performed outside contract

        // bytes32 attest = eas.attest(
        //         AttestationRequest({
        //             schema: schema,
        //             data: AttestationRequestData({
        //                 recipient: address(0), // No recipient
        //                 expirationTime: NO_EXPIRATION_TIME, // No expiration time
        //                 revocable: true,
        //                 refUID: EMPTY_UID, // No references UI
        //                 data: input, // Encode a single uint256 as a parameter to the schema
        //                 value: 0 // No value/ETH
        //             })
        //         })
        // );
        

        // console.log(abi.decode(input, (address,uint256)));

        if(eas.isAttestationValid(attestation)) {
        listedAttestations[module] = AttestationInfo(
            attestation
        );
        }
        emit ModuleAttested(module);
    }


    function checkAttest(address module) external view returns (uint64 listedAt, uint64 flaggedAt, bytes32 attestationId) {
        ModuleInfo memory moduleInfo = listedModules[module];
        AttestationInfo memory attestationInfo = listedAttestations[module];
        listedAt = moduleInfo.listedAt;
        flaggedAt = moduleInfo.flaggedAt;
        attestationId = attestationInfo.attestationId;
    }
}
