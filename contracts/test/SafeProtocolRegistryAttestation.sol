// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { IEAS, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

import {Enum} from "../common/Enum.sol";
import {SafeProtocolRegistry} from "../SafeProtocolRegistry.sol";
import {ISafeProtocolFunctionHandler, ISafeProtocolHooks, ISafeProtocolPlugin} from "../interfaces/Integrations.sol";

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
     * @notice Allows only owner to add a integration. A integration can be any address including zero address for now.
     *         This function does not permit adding a integration twice.
     *         TODO: Add logic to validate if integration implements correct interface.
     * @param integration Address of the integration
     */
    function addIntegration(address integration, Enum.IntegrationType integrationType) external override {
        IntegrationInfo memory integrationInfo = listedIntegrations[integration];

        if (integrationInfo.listedAt != 0) {
            revert CannotAddIntegration(integration);
        }
        listedIntegrations[integration] = IntegrationInfo(uint64(block.timestamp), 0, integrationType);
        emit IntegrationAdded(integration);
    }

    
    
    function attestIntegration(address integration, IEAS eas, bytes32 attestation) external {

        IntegrationInfo memory integrationInfo = listedIntegrations[integration];    

        if (integrationInfo.listedAt == 0 || integrationInfo.flaggedAt != 0) {
            revert CannotAttestModule(integration);
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
        listedAttestations[integration] = AttestationInfo(
            attestation
        );
        }
        emit ModuleAttested(integration);
    }


    function checkAttest(address integration) external view returns (uint64 listedAt, uint64 flaggedAt, bytes32 attestationId) {
        IntegrationInfo memory integrationInfo = listedIntegrations[integration];
        AttestationInfo memory attestationInfo = listedAttestations[integration];
        listedAt = integrationInfo.listedAt;
        flaggedAt = integrationInfo.flaggedAt;
        attestationId = attestationInfo.attestationId;
        
    }
}