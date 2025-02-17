import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-dependency-compiler';
import "hardhat-gas-reporter";
import dotenv from "dotenv";
import yargs from "yargs";
import { HttpNetworkUserConfig } from "hardhat/types";
import "hardhat-deploy";
import { DeterministicDeploymentInfo } from "hardhat-deploy/dist/types";
import { getSingletonFactoryInfo } from "@safe-global/safe-singleton-factory";
import { ethers } from "ethers";

// Load environment variables.
dotenv.config();

const argv : any = yargs
    .option("network", {
        type: "string",
        default: "hardhat",
    })
    .help(false)
    .version(false).argv;

const { NODE_URL, MNEMONIC, INFURA_KEY, ETHERSCAN_API_KEY, SAFE_PROTOCOL_OWNER_ADDRESS} = process.env;

const deterministicDeployment = (network: string): DeterministicDeploymentInfo => {
  const info = getSingletonFactoryInfo(parseInt(network));
  if (!info) {
      throw new Error(`
      Safe factory not found for network ${network}. You can request a new deployment at https://github.com/safe-global/safe-singleton-factory.
      For more information, see https://github.com/safe-global/safe-contracts#replay-protection-eip-155
    `);
  }
  return {
      factory: info.address,
      deployer: info.signerAddress,
      funding: (ethers.toBigInt(info.gasLimit) * (ethers.toBigInt(info.gasPrice))).toString(),
      signedTx: info.transaction,
  };
};


if (["goerli", "mumbai"].includes(argv.network) && INFURA_KEY === undefined) {
  throw new Error(`Could not find NODE_URL in env, unable to connect to network ${argv.network}`);
}

const sharedNetworkConfig: HttpNetworkUserConfig = {};

sharedNetworkConfig.accounts = {
  mnemonic: MNEMONIC || ""
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 100000000,
      gas: 100000000,
    },
    goerli: {
      ...sharedNetworkConfig,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    },
    sepolia: {
      ...sharedNetworkConfig,
      url: `https://eth-sepolia.g.alchemy.com/v2/eCr9bFDzgYgDrox-mnXPPh7_koP-agKo`,
    },
    mumbai: {
      ...sharedNetworkConfig,
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    },
    gnosis: {
      ...sharedNetworkConfig,
      url: "https://rpc.gnosischain.com",
    },
    mainnet: {
      ...sharedNetworkConfig,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    polygon: {
        ...sharedNetworkConfig,
        url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    bsc: {
        ...sharedNetworkConfig,
        url: `https://bsc-dataseed.binance.org/`,
    },
    arbitrum: {
        ...sharedNetworkConfig,
        url: `https://arb1.arbitrum.io/rpc`,
    },
    fantomTestnet: {
        ...sharedNetworkConfig,
        url: `https://rpc.testnet.fantom.network/`,
    },
    avalanche: {
        ...sharedNetworkConfig,
        url: `https://api.avax.network/ext/bc/C/rpc`,
    },
    base: {
      ...sharedNetworkConfig,
      url: `https://mainnet.base.org`,
    },
    baseGoerli: {
      ...sharedNetworkConfig,
      url: `https://base-goerli.g.alchemy.com/v2/K1GZzIiF6-PthdjPtfzvTOMcej2zOWWA`,
      gas: 4522512,
    },
    optimism: {
      ...sharedNetworkConfig,
      url: `https://mainnet.optimism.io`,
    },
    optimism_goerli: {
      ...sharedNetworkConfig,
      url: `https://goerli.optimism.io	`,
    },
  },

  dependencyCompiler: {
    paths: [
      '@ethereum-attestation-service/eas-contracts/contracts/EAS.sol',
      '@ethereum-attestation-service/eas-contracts/contracts/SchemaRegistry.sol'
    ]
  },
  
  deterministicDeployment,
  
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    owner: {
      default: SAFE_PROTOCOL_OWNER_ADDRESS || 1
    }
  }
};

if (NODE_URL) {
  config.networks!.custom = {
      ...sharedNetworkConfig,
      url: NODE_URL,
  };
}

export default config;
