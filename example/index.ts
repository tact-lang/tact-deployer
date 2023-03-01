import { prepareTactDeployment } from "@tact-lang/tact-deployer-sdk";

(async () => {
  const deploymentUrl = await prepareTactDeployment(
    Buffer.from("somepkg"),
    Buffer.from("somedddOtherpkg")
  );

  console.log(deploymentUrl);
  // https://verifier.ton.org/tactDeployer/QmRwiQbwjZqNwwUhhZfaSnHUr4bkrGF6cRXARkuMbZaJVD
})();
