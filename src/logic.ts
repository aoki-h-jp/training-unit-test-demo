import { v4 as uuidv4 } from 'uuid';
import { store } from './store';
import { InventoryItem } from './types';

export class InventoryError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'InventoryError';
  }
}

export const getInventory = ({ id }: { id?: string }) => {
  if (!id) {
    return Array.from(store.items.values());
  }

  const item = store.items.get(id);
  if (!item) {
    throw new InventoryError(404, `Item with id ${id} not found`);
  }
  return item;
};

export const addItem = ({ name, quantity }: { name: string; quantity: number }) => {
  if (!name || quantity === undefined) {
    throw new InventoryError(400, 'Name and quantity are required');
  }

  const id = uuidv4();
  const newItem: InventoryItem = { id, name, quantity };
  store.items.set(id, newItem);
  return newItem;
};

export const updateItem = ({ id, quantity }: { id: string; quantity: number }) => {
  if (!id || quantity === undefined) {
    throw new InventoryError(400, 'Id and quantity are required');
  }

  const item = store.items.get(id);
  if (!item) {
    throw new InventoryError(404, `Item with id ${id} not found`);
  }

  const updatedItem = { ...item, quantity };
  store.items.set(id, updatedItem);
  return updatedItem;
};

export const deleteItem = ({ id }: { id: string }) => {
  if (!id) {
    throw new InventoryError(400, 'Id is required');
  }

  if (!store.items.has(id)) {
    throw new InventoryError(404, `Item with id ${id} not found`);
  }

  store.items.delete(id);
  return { message: 'Item deleted successfully' };
}; 