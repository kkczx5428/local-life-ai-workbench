import { LocalStorageProvider } from "./local";
import type { StorageProvider } from "./provider";

export function getStorageProvider(): StorageProvider {
  const provider = process.env.STORAGE_PROVIDER || "local";
  if (provider !== "local") throw new Error(`暂不支持对象存储提供商: ${provider}`);
  return new LocalStorageProvider();
}
