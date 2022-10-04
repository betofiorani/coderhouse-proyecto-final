import { readFile } from "fs/promises";

export const getFirebaseSecretKey = async (path) => {
  const file = await readFile(path, "utf8");
  return JSON.parse(file);
}