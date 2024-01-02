import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer, owner } = await getNamedAccounts();
    const { deploy } = deployments;
    const eadAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
    const testRegistry = await deploy("SafeProtocolRegistryAttestation", {
        from: deployer,
        args: [owner, eadAddress],
        log: true,
        deterministicDeployment: true,
    });

    await deploy("SafeProtocolManagerAttestation", {
        from: deployer,
        args: [owner, testRegistry.address],
        log: true,
        deterministicDeployment: true,
    });
};

deploy.tags = ["attestation-protocol"];
export default deploy;