# Tact Deployer

A lib to prepare deployment of a tact package

### Installation

```
yarn add @tact-lang/deployer
```

### Usage

```typescript
import { prepareTactDeployment } from "@tact-lang/deployer";

const pkg = fs.readFileSync("my.pkg");
const data = fs.readFileSync("data.boc");

const deploymentUrl = await prepareTactDeployment({ pkg, data });

console.log(deploymentUrl); // https://verifier.ton.org/tactDeployer/QmRwiQbwjZqNwwUhhZfaSnHUr4bkrGF6cRXARkuMbZaJVD
```

## License

MIT
