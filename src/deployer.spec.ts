import { prepareTactDeployment } from './deployer';

describe('deployer', () => {
    it('should request link', async () => {
        let prepared = await prepareTactDeployment({ pkg: Buffer.from('somepkg'), data: Buffer.from('somedddOtherpkg') });
        expect(prepared).toBe('https://verifier.ton.org/tactDeployer/QmRwiQbwjZqNwwUhhZfaSnHUr4bkrGF6cRXARkuMbZaJVE');
    });
});