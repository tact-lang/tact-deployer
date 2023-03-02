# Tact Deployer SDK
An SDK to prepare deployment of a tact package

### Installation
```
npm install @tact-lang/tact-deployer-sdk
```

### Usage

```typescript
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
2. Run `npm install`
3. Run `npm run build`
4. Run `npm link`

### Node.js
1. Navigate to `example`
2. Run `npm install`
3. Run `npm link ../`
4. Run `ts-node index.ts`

## 📔 License
MIT
