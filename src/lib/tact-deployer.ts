import fetch from "node-fetch";
import FormData from "form-data";
import { Cell } from "ton-core";

const configUrl =
  "https://raw.githubusercontent.com/ton-community/contract-verifier-config/main/config.json";

function randomFromArray<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Returns a URL for deployment
export async function prepareTactDeployment(
  pkg: Buffer,
  dataCellBoc: Buffer
): Promise<string> {
  // @ts-ignore
  const { backends } = await fetch(configUrl).then((_res) => _res.json());
  const backend = randomFromArray(backends);

  const form = new FormData();

  form.append("file", pkg, {
    knownLength: pkg.byteLength,
    filename: "source.pkg",
  });

  form.append("file2", dataCellBoc, {
    knownLength: dataCellBoc.byteLength,
    filename: "data.boc",
  });

  const res = await fetch(`${backend}/prepareTactDeployment`, {
    method: "POST",
    body: form,
    headers: form.getHeaders(),
  });

  return res.json();
}
