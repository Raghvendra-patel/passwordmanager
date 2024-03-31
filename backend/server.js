const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = 'SajalTodo';

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const app = express();
    const port = 3500;

    app.use(express.json());
    app.use(cors());

    // Get all todos
    app.get('/getAll', async (req, res) => {
      const collection = db.collection('todos');
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    // Save a new todo
    app.post('/save', async (req, res) => {
      const newTodo = req.body;
      const collection = db.collection('todos');
      const save = await collection.insertOne(newTodo);
      res.json({ success: true, result: save });
    });

    // Update a todo by ID
    app.put('/update/:id', async (req, res) => {
      const id = req.params.id;
      const updatedTodo = req.body;
      const collection = db.collection('todos');
      const updateResult = await collection.updateOne({ id:id }, { $set: updatedTodo });
      res.json({ success: true, result: updateResult });
    });

    // Delete a todo by ID
    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id;
      const collection = db.collection('todos');
      const deleteResult = await collection.deleteOne({ id: id});
      res.json({ success: true, result: deleteResult });
    });

    // Delete all todos
    app.delete('/deleteAll', async (req, res) => {
      const collection = db.collection('todos');
      const deleteResult = await collection.deleteMany({});
      res.json({ success: true, result: deleteResult });
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error('Error occurred:', err);
  }
}
main();
