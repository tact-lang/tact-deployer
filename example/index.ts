import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
  const deploymentUrl = await prepareTactDeployment(
    Buffer.from("somepkg"),
    Buffer.from("somedddOtherpkg")
  );

  console.log(deploymentUrl);
  // https://verifier.ton.org/tactDeployer/QmRwiQbwjZqNwwUhhZfaSnHUr4bkrGF6cRXARkuMbZaJVD
})();
