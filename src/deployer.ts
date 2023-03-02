import FormData from "form-data";
import axios from 'axios';
import * as z from 'zod';

const configScheme = z.object({
  backends: z.array(z.string()),
});

const configUrl = "https://raw.githubusercontent.com/ton-community/contract-verifier-config/main/config.json";

function randomFromArray<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function fetchBackend() {
  let parsed = configScheme.parse(await axios.get(configUrl).then((_res) => _res.data));
  return randomFromArray(parsed.backends);
}

// Returns a URL for deployment
export async function prepareTactDeployment(args: { pkg: Buffer, data: Buffer }): Promise<string> {

  // Fetch backend
  const backend = await fetchBackend();

  // Upload files
  const form = new FormData();
  form.append("file", args.pkg, {
    knownLength: args.pkg.length,
    filename: "source.pkg",
  });
  form.append("file2", args.data, {
    knownLength: args.data.length,
    filename: "data.boc",
  });
  const res = await axios.post(`${backend}/prepareTactDeployment`, form, {
    headers: form.getHeaders(),
  });
  if (typeof res.data !== 'string') {
    throw new Error(`Unexpected response from backend: ${res.data}`);
  }

  return res.data as string;
}
