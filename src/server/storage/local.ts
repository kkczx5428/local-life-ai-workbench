import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import type { StorageProvider, StoredObject } from "./provider";

export class LocalStorageProvider implements StorageProvider {
  constructor(private readonly root = path.join(process.cwd(), "storage")) {}
  async put(input: { key: string; body: Buffer; contentType: string }): Promise<StoredObject> {
    const target = path.join(this.root, input.key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, input.body);
    return { key: input.key, size: input.body.length, contentType: input.contentType };
  }
  async getSignedUrl(key: string): Promise<string> { return `/api/assets/${encodeURIComponent(key)}`; }
  async delete(key: string): Promise<void> { await unlink(path.join(this.root, key)); }
}
