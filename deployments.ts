export default {
  "5": [
    {
      "name": "goerli",
      "chainId": "5",
      "contracts": {
        "SafeProtocolManagerAttestation": {
          "address": "0xEde5056fAEafF22E922ED6a8458091B7404354A8",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "registry",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "AccountDoesNotImplementValidInterfaceId",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "ActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "AddressDoesNotImplementHooksInterface",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPrevPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "InvalidToFieldInSafeProtocolAction",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "requiresRootAccess",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "providedValue",
                  "type": "bool"
                }
              ],
              "name": "PluginAccessMismatch",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginAlreadyEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginEnabledOnlyForRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginNotEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "name": "PluginNotPermitted",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "PluginRequiresRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ZeroPageSizeNotAllowed",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                }
              ],
              "name": "ActionsExecuted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "HooksChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginDisabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "PluginEnabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "oldRegistry",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "RegistryChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecuted",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                }
              ],
              "name": "checkAfterExecution",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "checkModuleTransaction",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "moduleTxHash",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "safeTxGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "baseGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "gasPrice",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "gasToken",
                  "type": "address"
                },
                {
                  "internalType": "address payable",
                  "name": "refundReceiver",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "signatures",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "msgSender",
                  "type": "address"
                }
              ],
              "name": "checkTransaction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "prevPlugin",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "disablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "enablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledPlugins",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "rootAddressGranted",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "nextPluginPointer",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction",
                      "name": "action",
                      "type": "tuple"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeRootAccess",
                  "name": "rootAccess",
                  "type": "tuple"
                }
              ],
              "name": "executeRootAccess",
              "outputs": [
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction[]",
                      "name": "actions",
                      "type": "tuple[]"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeTransaction",
                  "name": "transaction",
                  "type": "tuple"
                }
              ],
              "name": "executeTransaction",
              "outputs": [
                {
                  "internalType": "bytes[]",
                  "name": "data",
                  "type": "bytes[]"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getEnabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "getPluginInfo",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "bool",
                      "name": "rootAddressGranted",
                      "type": "bool"
                    },
                    {
                      "internalType": "address",
                      "name": "nextPluginPointer",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct SafeProtocolManager.PluginAccessInfo",
                  "name": "enabled",
                  "type": "tuple"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "start",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "pageSize",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getPluginsPaginated",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "array",
                  "type": "address[]"
                },
                {
                  "internalType": "address",
                  "name": "next",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "isPluginEnabled",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "registry",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooks",
                  "type": "address"
                }
              ],
              "name": "setHooks",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "setRegistry",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "tempHooksData",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "preCheckData",
                  "type": "bytes"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "SafeProtocolRegistryAttestation": {
          "address": "0x036cE4a087649154aA9314fc12221BaE76eAc697",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "CannotAddIntegration",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "CannotAttestModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "CannotFlagIntegration",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "IntegrationAdded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "IntegrationFlagged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleAttested",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                },
                {
                  "internalType": "enum Enum.IntegrationType",
                  "name": "integrationType",
                  "type": "uint8"
                }
              ],
              "name": "addIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                },
                {
                  "internalType": "contract IEAS",
                  "name": "eas",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "attestation",
                  "type": "bytes32"
                }
              ],
              "name": "attestIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "check",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "checkAttest",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "attestationId",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "flagIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedAttestations",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "attestationId",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedIntegrations",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "enum Enum.IntegrationType",
                  "name": "integrationType",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "TestSafeProtocolManager": {
          "address": "0x9B5984CcF506029952442441cD36b116292d2e06",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "registry",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "ActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "ContractDoesNotImplementValidInterfaceId",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "functionSelector",
                  "type": "bytes4"
                }
              ],
              "name": "FunctionHandlerNotSet",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "InvalidCalldataLength",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPrevPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "InvalidSender",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "InvalidToFieldInSafeProtocolAction",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "name": "ModuleNotPermitted",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "requiresRootAccess",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "providedValue",
                  "type": "bool"
                }
              ],
              "name": "PluginAccessMismatch",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginAlreadyEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginEnabledOnlyForRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginNotEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "PluginRequiresRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ZeroPageSizeNotAllowed",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                }
              ],
              "name": "ActionsExecuted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "bytes4",
                  "name": "selector",
                  "type": "bytes4"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "functionHandler",
                  "type": "address"
                }
              ],
              "name": "FunctionHandlerChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "HooksChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginDisabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "PluginEnabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "oldRegistry",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "RegistryChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecuted",
              "type": "event"
            },
            {
              "stateMutability": "nonpayable",
              "type": "fallback"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                }
              ],
              "name": "checkAfterExecution",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "checkModuleTransaction",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "moduleTxHash",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "safeTxGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "baseGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "gasPrice",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "gasToken",
                  "type": "address"
                },
                {
                  "internalType": "address payable",
                  "name": "refundReceiver",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "signatures",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "msgSender",
                  "type": "address"
                }
              ],
              "name": "checkTransaction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "prevPlugin",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "disablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "enablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledPlugins",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "rootAddressGranted",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "nextPluginPointer",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction",
                      "name": "action",
                      "type": "tuple"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeRootAccess",
                  "name": "rootAccess",
                  "type": "tuple"
                }
              ],
              "name": "executeRootAccess",
              "outputs": [
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction[]",
                      "name": "actions",
                      "type": "tuple[]"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeTransaction",
                  "name": "transaction",
                  "type": "tuple"
                }
              ],
              "name": "executeTransaction",
              "outputs": [
                {
                  "internalType": "bytes[]",
                  "name": "data",
                  "type": "bytes[]"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "",
                  "type": "bytes4"
                }
              ],
              "name": "functionHandlers",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getEnabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "selector",
                  "type": "bytes4"
                }
              ],
              "name": "getFunctionHandler",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "functionHandler",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "getPluginInfo",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "bool",
                      "name": "rootAddressGranted",
                      "type": "bool"
                    },
                    {
                      "internalType": "address",
                      "name": "nextPluginPointer",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct SafeProtocolManager.PluginAccessInfo",
                  "name": "enabled",
                  "type": "tuple"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "start",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "pageSize",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getPluginsPaginated",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "array",
                  "type": "address[]"
                },
                {
                  "internalType": "address",
                  "name": "next",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "isPluginEnabled",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "registry",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "selector",
                  "type": "bytes4"
                },
                {
                  "internalType": "address",
                  "name": "functionHandler",
                  "type": "address"
                }
              ],
              "name": "setFunctionHandler",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooks",
                  "type": "address"
                }
              ],
              "name": "setHooks",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "setRegistry",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "tempHooksData",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "preCheckData",
                  "type": "bytes"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "testFunction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "TestSafeProtocolRegistryUnrestricted": {
          "address": "0xc07d01C11D05a1fFB18E44587A016ca6F48d5fd2",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "CannotAddModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "CannotFlagModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "expectedInterfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "ModuleDoesNotSupportExpectedInterfaceId",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleAdded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleFlagged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                },
                {
                  "internalType": "enum Enum.ModuleType",
                  "name": "moduleType",
                  "type": "uint8"
                }
              ],
              "name": "addModule",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "check",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "flagModule",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedModules",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "enum Enum.ModuleType",
                  "name": "moduleType",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        }
      }
    }
  ],
  "84531": [
    {
      "name": "base_goerli",
      "chainId": "84531",
      "contracts": {
        "SafeProtocolManagerAttestation": {
          "address": "0x68F29c8054dBB959e39eA49c7DF7361517A870aA",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "registry",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "AccountDoesNotImplementValidInterfaceId",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "ActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "AddressDoesNotImplementHooksInterface",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPrevPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "InvalidToFieldInSafeProtocolAction",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "requiresRootAccess",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "providedValue",
                  "type": "bool"
                }
              ],
              "name": "PluginAccessMismatch",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginAlreadyEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginEnabledOnlyForRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginNotEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "name": "PluginNotPermitted",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "PluginRequiresRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ZeroPageSizeNotAllowed",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                }
              ],
              "name": "ActionsExecuted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "HooksChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginDisabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "PluginEnabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "oldRegistry",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "RegistryChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecuted",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                }
              ],
              "name": "checkAfterExecution",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "checkModuleTransaction",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "moduleTxHash",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "safeTxGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "baseGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "gasPrice",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "gasToken",
                  "type": "address"
                },
                {
                  "internalType": "address payable",
                  "name": "refundReceiver",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "signatures",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "msgSender",
                  "type": "address"
                }
              ],
              "name": "checkTransaction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "prevPlugin",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "disablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "enablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledPlugins",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "rootAddressGranted",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "nextPluginPointer",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction",
                      "name": "action",
                      "type": "tuple"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeRootAccess",
                  "name": "rootAccess",
                  "type": "tuple"
                }
              ],
              "name": "executeRootAccess",
              "outputs": [
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction[]",
                      "name": "actions",
                      "type": "tuple[]"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeTransaction",
                  "name": "transaction",
                  "type": "tuple"
                }
              ],
              "name": "executeTransaction",
              "outputs": [
                {
                  "internalType": "bytes[]",
                  "name": "data",
                  "type": "bytes[]"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getEnabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "getPluginInfo",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "bool",
                      "name": "rootAddressGranted",
                      "type": "bool"
                    },
                    {
                      "internalType": "address",
                      "name": "nextPluginPointer",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct SafeProtocolManager.PluginAccessInfo",
                  "name": "enabled",
                  "type": "tuple"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "start",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "pageSize",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getPluginsPaginated",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "array",
                  "type": "address[]"
                },
                {
                  "internalType": "address",
                  "name": "next",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "isPluginEnabled",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "registry",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooks",
                  "type": "address"
                }
              ],
              "name": "setHooks",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "setRegistry",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "tempHooksData",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "preCheckData",
                  "type": "bytes"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "SafeProtocolRegistryAttestation": {
          "address": "0xB8Efa352FA011EEe3552f73aC86d5b5ecA9802f7",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "CannotAddIntegration",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "CannotAttestModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "CannotFlagIntegration",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "IntegrationAdded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "IntegrationFlagged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleAttested",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                },
                {
                  "internalType": "enum Enum.IntegrationType",
                  "name": "integrationType",
                  "type": "uint8"
                }
              ],
              "name": "addIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                },
                {
                  "internalType": "contract IEAS",
                  "name": "eas",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "attestation",
                  "type": "bytes32"
                }
              ],
              "name": "attestIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "check",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "checkAttest",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "attestationId",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "flagIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedAttestations",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "attestationId",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedIntegrations",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "enum Enum.IntegrationType",
                  "name": "integrationType",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "TestSafeProtocolManager": {
          "address": "0x306961ACA7D3E100B41f5B68Aeb76247B1f26A49",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "registry",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "ActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "ContractDoesNotImplementValidInterfaceId",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "functionSelector",
                  "type": "bytes4"
                }
              ],
              "name": "FunctionHandlerNotSet",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "InvalidCalldataLength",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPrevPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "InvalidSender",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "InvalidToFieldInSafeProtocolAction",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint8",
                  "name": "pluginRequires",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "requiredPermission",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "givenPermission",
                  "type": "uint8"
                }
              ],
              "name": "MissingPluginPermission",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint8",
                  "name": "moduleType",
                  "type": "uint8"
                }
              ],
              "name": "ModuleNotPermitted",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginAlreadyEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginNotEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint8",
                  "name": "requiredPermissions",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "givenPermissions",
                  "type": "uint8"
                }
              ],
              "name": "PluginPermissionsMismatch",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ZeroPageSizeNotAllowed",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                }
              ],
              "name": "ActionsExecuted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "bytes4",
                  "name": "selector",
                  "type": "bytes4"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "functionHandler",
                  "type": "address"
                }
              ],
              "name": "FunctionHandlerChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "HooksChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginDisabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint8",
                  "name": "permissions",
                  "type": "uint8"
                }
              ],
              "name": "PluginEnabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "oldRegistry",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "RegistryChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecuted",
              "type": "event"
            },
            {
              "stateMutability": "nonpayable",
              "type": "fallback"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                }
              ],
              "name": "checkAfterExecution",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "checkModuleTransaction",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "moduleTxHash",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "safeTxGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "baseGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "gasPrice",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "gasToken",
                  "type": "address"
                },
                {
                  "internalType": "address payable",
                  "name": "refundReceiver",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "signatures",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "msgSender",
                  "type": "address"
                }
              ],
              "name": "checkTransaction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "prevPlugin",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "disablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint8",
                  "name": "permissions",
                  "type": "uint8"
                }
              ],
              "name": "enablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledPlugins",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "permissions",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "nextPluginPointer",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction",
                      "name": "action",
                      "type": "tuple"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeRootAccess",
                  "name": "rootAccess",
                  "type": "tuple"
                }
              ],
              "name": "executeRootAccess",
              "outputs": [
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction[]",
                      "name": "actions",
                      "type": "tuple[]"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeTransaction",
                  "name": "transaction",
                  "type": "tuple"
                }
              ],
              "name": "executeTransaction",
              "outputs": [
                {
                  "internalType": "bytes[]",
                  "name": "data",
                  "type": "bytes[]"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "",
                  "type": "bytes4"
                }
              ],
              "name": "functionHandlers",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "getEnabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "selector",
                  "type": "bytes4"
                }
              ],
              "name": "getFunctionHandler",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "functionHandler",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "getPluginInfo",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "permissions",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "nextPluginPointer",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct SafeProtocolManager.PluginAccessInfo",
                  "name": "enabled",
                  "type": "tuple"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "start",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "pageSize",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "getPluginsPaginated",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "array",
                  "type": "address[]"
                },
                {
                  "internalType": "address",
                  "name": "next",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "isPluginEnabled",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "registry",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "selector",
                  "type": "bytes4"
                },
                {
                  "internalType": "address",
                  "name": "functionHandler",
                  "type": "address"
                }
              ],
              "name": "setFunctionHandler",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooks",
                  "type": "address"
                }
              ],
              "name": "setHooks",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "setRegistry",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "tempHooksData",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "preCheckData",
                  "type": "bytes"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "testFunction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "TestSafeProtocolRegistryUnrestricted": {
          "address": "0x3727C87B2C2265649cCCca8cB03c961a09c97d99",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                },
                {
                  "internalType": "uint8",
                  "name": "moduleTypes",
                  "type": "uint8"
                }
              ],
              "name": "CannotAddModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "CannotFlagModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                },
                {
                  "internalType": "bytes4",
                  "name": "expectedInterfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "ModuleDoesNotSupportExpectedInterfaceId",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleAdded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleFlagged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                },
                {
                  "internalType": "uint8",
                  "name": "moduleType",
                  "type": "uint8"
                }
              ],
              "name": "addModule",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "data",
                  "type": "bytes32"
                }
              ],
              "name": "check",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "flagModule",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedModules",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint8",
                  "name": "moduleTypes",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        }
      }
    }
  ],
  "11155111": [
    {
      "name": "sepolia",
      "chainId": "11155111",
      "contracts": {
        "SafeProtocolManagerAttestation": {
          "address": "0xEde5056fAEafF22E922ED6a8458091B7404354A8",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "registry",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "AccountDoesNotImplementValidInterfaceId",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "ActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "AddressDoesNotImplementHooksInterface",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "InvalidPrevPluginAddress",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
                }
              ],
              "name": "InvalidToFieldInSafeProtocolAction",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "requiresRootAccess",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "providedValue",
                  "type": "bool"
                }
              ],
              "name": "PluginAccessMismatch",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginAlreadyEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginEnabledOnlyForRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginNotEnabled",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "name": "PluginNotPermitted",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "PluginRequiresRootAccess",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecutionFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ZeroPageSizeNotAllowed",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                }
              ],
              "name": "ActionsExecuted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "name": "HooksChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "PluginDisabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "PluginEnabled",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "oldRegistry",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "RegistryChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "metadataHash",
                  "type": "bytes32"
                }
              ],
              "name": "RootAccessActionExecuted",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                }
              ],
              "name": "checkAfterExecution",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "checkModuleTransaction",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "moduleTxHash",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "enum Enum.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "safeTxGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "baseGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "gasPrice",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "gasToken",
                  "type": "address"
                },
                {
                  "internalType": "address payable",
                  "name": "refundReceiver",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "signatures",
                  "type": "bytes"
                },
                {
                  "internalType": "address",
                  "name": "msgSender",
                  "type": "address"
                }
              ],
              "name": "checkTransaction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "prevPlugin",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "disablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "allowRootAccess",
                  "type": "bool"
                }
              ],
              "name": "enablePlugin",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "enabledPlugins",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "rootAddressGranted",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "nextPluginPointer",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction",
                      "name": "action",
                      "type": "tuple"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeRootAccess",
                  "name": "rootAccess",
                  "type": "tuple"
                }
              ],
              "name": "executeRootAccess",
              "outputs": [
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "contract ISafe",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "address payable",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "internalType": "struct SafeProtocolAction[]",
                      "name": "actions",
                      "type": "tuple[]"
                    },
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "metadataHash",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct SafeTransaction",
                  "name": "transaction",
                  "type": "tuple"
                }
              ],
              "name": "executeTransaction",
              "outputs": [
                {
                  "internalType": "bytes[]",
                  "name": "data",
                  "type": "bytes[]"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getEnabledHooks",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "getPluginInfo",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "bool",
                      "name": "rootAddressGranted",
                      "type": "bool"
                    },
                    {
                      "internalType": "address",
                      "name": "nextPluginPointer",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct SafeProtocolManager.PluginAccessInfo",
                  "name": "enabled",
                  "type": "tuple"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "start",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "pageSize",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                }
              ],
              "name": "getPluginsPaginated",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "array",
                  "type": "address[]"
                },
                {
                  "internalType": "address",
                  "name": "next",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "safe",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                }
              ],
              "name": "isPluginEnabled",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "registry",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "hooks",
                  "type": "address"
                }
              ],
              "name": "setHooks",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newRegistry",
                  "type": "address"
                }
              ],
              "name": "setRegistry",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "tempHooksData",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "hooksAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "preCheckData",
                  "type": "bytes"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        },
        "SafeProtocolRegistryAttestation": {
          "address": "0x036cE4a087649154aA9314fc12221BaE76eAc697",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "initialOwner",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "CannotAddIntegration",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "CannotAttestModule",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "CannotFlagIntegration",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "IntegrationAdded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "IntegrationFlagged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "module",
                  "type": "address"
                }
              ],
              "name": "ModuleAttested",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "acceptOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                },
                {
                  "internalType": "enum Enum.IntegrationType",
                  "name": "integrationType",
                  "type": "uint8"
                }
              ],
              "name": "addIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                },
                {
                  "internalType": "contract IEAS",
                  "name": "eas",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "attestation",
                  "type": "bytes32"
                }
              ],
              "name": "attestIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "check",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "checkAttest",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "attestationId",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "integration",
                  "type": "address"
                }
              ],
              "name": "flagIntegration",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedAttestations",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "attestationId",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "listedIntegrations",
              "outputs": [
                {
                  "internalType": "uint64",
                  "name": "listedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "flaggedAt",
                  "type": "uint64"
                },
                {
                  "internalType": "enum Enum.IntegrationType",
                  "name": "integrationType",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pendingOwner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
        }
      }
    }
  ]
} as const;