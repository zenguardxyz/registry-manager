// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.18;
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ISafeProtocolRegistry} from "./Registry.sol";

interface ISafeProtocolRegistryAttested is ISafeProtocolRegistry {
    /// @param module Address of the module that should be checked
    /// @return listedAt MUST return the block number when the module was listed in the registry (or 0 if not listed)
    /// @return flaggedAt MUST return the block number when the module was listed in the flagged as faulty (or 0 if not flagged)

    function checkAttest(address module) external view returns (uint64 listedAt, uint64 flaggedAt,  bytes32 attestationId);

}
