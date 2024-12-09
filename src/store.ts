import { DataStore, InventoryItem } from './types';

export class MemoryDataStore implements DataStore {
  items: Map<string, InventoryItem>;

  constructor() {
    this.items = new Map<string, InventoryItem>();
  }

  clear() {
    this.items.clear();
  }
}

// シングルトンとしてストアを提供
export const store = new MemoryDataStore(); 