import FormData from "form-data";
import axios from "axios";
import * as z from "zod";

const verifierEntryScheme = z.object({
  id: z.string(),
  network: z.enum(["mainnet", "testnet"]),
  backends: z.array(z.string()),
});

const configScheme = z.object({
  verifiers: z.array(verifierEntryScheme),
});

const configUrl =
  "https://raw.githubusercontent.com/ton-community/contract-verifier-config/main/config.json";

function randomFromArray<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function fetchBackend(verifier: string, testnet?: boolean) {
  const parsed = configScheme.parse(
    await axios.get(configUrl).then((_res) => _res.data)
  );
  const network = testnet ? "testnet" : "mainnet";
  const entry = parsed.verifiers.find(
    (v) => v.id === verifier && v.network === network
  );
  if (!entry) {
    throw new Error(
      `Verifier "${verifier}" not found for network "${network}"`
    );
  }
  return randomFromArray(entry.backends);
}

// Returns a URL for deployment
export async function prepareTactDeployment(args: {
  pkg: Buffer;
  data: Buffer;
  testnet?: boolean;
  verifier?: string;
}): Promise<string> {
  // Fetch backend
  const backend = await fetchBackend(
    args.verifier ?? "verifier.ton.org",
    args.testnet
  );

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
  if (typeof res.data !== "string") {
    throw new Error(`Unexpected response from backend: ${res.data}`);
  }

  return res.data as string;
}
