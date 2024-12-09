import { describe, it, expect, beforeEach } from 'vitest';
import { getInventory, addItem, updateItem, deleteItem, InventoryError } from '../src/logic';
import { store } from '../src/store';

describe('Inventory Management', () => {
  beforeEach(() => {
    store.clear();
  });

  describe('GET /inventory', () => {
    it('should return empty array when no items exist', () => {
      const result = getInventory({});
      expect(result).toEqual([]);
    });

    it('should return all items when no id is specified', () => {
      const item = addItem({ name: 'Widget', quantity: 10 });
      const result = getInventory({});
      expect(result).toEqual([item]);
    });

    it('should return specific item when id is specified', () => {
      const item = addItem({ name: 'Widget', quantity: 10 });
      const result = getInventory({ id: item.id });
      expect(result).toEqual(item);
    });

    it('should throw 404 when item is not found', () => {
      expect(() => getInventory({ id: 'non-existent' }))
        .toThrow(InventoryError);
    });
  });

  describe('POST /inventory', () => {
    it('should create new item', () => {
      const result = addItem({ name: 'Widget', quantity: 10 });
      expect(result).toEqual({
        id: expect.any(String),
        name: 'Widget',
        quantity: 10
      });
    });

    it('should throw 400 when name is missing', () => {
      expect(() => addItem({ name: '', quantity: 10 }))
        .toThrow(InventoryError);
    });
  });

  describe('PUT /inventory/:id', () => {
    it('should update existing item', () => {
      const item = addItem({ name: 'Widget', quantity: 10 });
      const result = updateItem({ id: item.id, quantity: 20 });
      expect(result.quantity).toBe(20);
    });

    it('should throw 404 when updating non-existent item', () => {
      expect(() => updateItem({ id: 'non-existent', quantity: 20 }))
        .toThrow(InventoryError);
    });
  });

  describe('DELETE /inventory/:id', () => {
    it('should delete existing item', () => {
      const item = addItem({ name: 'Widget', quantity: 10 });
      const result = deleteItem({ id: item.id });
      expect(result.message).toBe('Item deleted successfully');
      expect(() => getInventory({ id: item.id })).toThrow(InventoryError);
    });

    it('should throw 404 when deleting non-existent item', () => {
      expect(() => deleteItem({ id: 'non-existent' }))
        .toThrow(InventoryError);
    });
  });
}); 