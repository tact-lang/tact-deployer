"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTactDeployment = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const configUrl = "https://raw.githubusercontent.com/ton-community/contract-verifier-config/main/config.json";
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
// Returns a URL for deployment
async function prepareTactDeployment(pkg, dataCellBoc) {
    // @ts-ignore
    const { backends } = await (0, node_fetch_1.default)(configUrl).then((_res) => _res.json());
    const backend = randomFromArray(backends);
    const form = new form_data_1.default();
    form.append("file", pkg, {
        knownLength: pkg.byteLength,
        filename: "source.pkg",
    });
    form.append("file2", dataCellBoc, {
        knownLength: dataCellBoc.byteLength,
        filename: "data.boc",
    });
    const res = await (0, node_fetch_1.default)(`${backend}/prepareTactDeployment`, {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
    });
    return res.json();
}
exports.prepareTactDeployment = prepareTactDeployment;
//# sourceMappingURL=tact-deployer.js.map