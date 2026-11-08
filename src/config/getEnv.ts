import assert from "node:assert";

export function getEnv(name: string): string {
  const value = process.env[name];
  assert(value, `Please provide ${name} in your env variables`);
  return value;
}
