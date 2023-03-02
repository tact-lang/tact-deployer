# Tact Deployer
A lib to prepare deployment of a tact package

### Installation
```
yarn add @tact-lang/deployer
```

### Usage

```typescript
import { prepareTactDeployment } from "@tact-lang/deployer";

const pkg = fs.readFileSync('my.pkg')
const data = fs.readFileSync('data.boc');

const deploymentUrl = await prepareTactDeployment(
    pkg,
    data
  );

  console.log(deploymentUrl);
  // https://verifier.ton.org/tactDeployer/QmRwiQbwjZqNwwUhhZfaSnHUr4bkrGF6cRXARkuMbZaJVD
```

## 👀 Demo
1. Clone this repo
2. Run `yarn`
3. Run `yarn build`
4. Run `yarn link`

### Node.js
1. Navigate to `example`
3. Run `yarn link "@tact-lang/deployer"`
4. Run `ts-node index.ts`

## 📔 License
MIT
