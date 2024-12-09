import express from 'express';
import { getInventory, addItem, updateItem, deleteItem, InventoryError } from './logic';

const app = express();
app.use(express.json());

app.get('/inventory', (req, res) => {
  try {
    const result = getInventory({ id: req.query.id as string | undefined });
    res.json(result);
  } catch (error) {
    if (error instanceof InventoryError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.post('/inventory', (req, res) => {
  try {
    const result = addItem(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof InventoryError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.put('/inventory/:id', (req, res) => {
  try {
    const result = updateItem({ id: req.params.id, quantity: req.body.quantity });
    res.json(result);
  } catch (error) {
    if (error instanceof InventoryError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.delete('/inventory/:id', (req, res) => {
  try {
    const result = deleteItem({ id: req.params.id });
    res.json(result);
  } catch (error) {
    if (error instanceof InventoryError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export { app }; 