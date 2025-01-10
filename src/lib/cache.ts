export interface Cache<T> {
  get(key: string): Promise<T | undefined>;
  set(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  update(key: string, partialValue: Partial<T>, ttl?: number): Promise<void>;
  clear(): Promise<void>;
}

export class MemoryCache<T> implements Cache<T> {
  private cache: Map<string, { value: T; expiry: number | null }> = new Map();

  async get(key: string): Promise<T | undefined> {
    const item = this.cache.get(key);
    if (!item) return undefined;
    if (item.expiry !== null && item.expiry < Date.now()) {
      await this.delete(key);
      return undefined;
    }
    return item.value;
  }
  async set(key: string, value: T, ttl?: number): Promise<void> {
    const expiry = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expiry });
  }

  async update(
    key: string,
    partialValue: Partial<T>,
    ttl?: number
  ): Promise<void> {
    const existingItem = this.cache.get(key);
    if (!existingItem) {
      throw new Error("Item not found in cache");
    }
    const updatedValue = { ...existingItem.value, ...partialValue };
    const expiry = ttl ? Date.now() + ttl * 1000 : existingItem.expiry;
    this.cache.set(key, { value: updatedValue, expiry });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}
