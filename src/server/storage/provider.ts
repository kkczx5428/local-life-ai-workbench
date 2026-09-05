export type StoredObject = { key: string; size: number; contentType: string };

export interface StorageProvider {
  put(input: { key: string; body: Buffer; contentType: string }): Promise<StoredObject>;
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;
  delete(key: string): Promise<void>;
}
