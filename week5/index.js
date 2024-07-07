// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Item = require('./models/Item');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crudapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  app.post('/items', async (req, res) => {
    const { name, quantity } = req.body;
  
    try {
      const newItem = new Item({ name, quantity });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Read
  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/items/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update
  app.put('/items/:id', async (req, res) => {
    const { name, quantity } = req.body;
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        { name, quantity },
        { new: true, runValidators: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.status(200).json(updatedItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete
  app.delete('/items/:id', async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
