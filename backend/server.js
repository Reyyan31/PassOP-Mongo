const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passOP';
const port = 3000;
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors()); // Use cors() to execute the function and use the middleware.
client.connect().then(() => {
    app.get('/', async (req, res) => {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    });

    app.post('/', async (req, res) => {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(password);
        res.send({ success: true, result: findResult });
    });

    app.delete('/', async (req, res) => {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne(password);
        res.send({ success: true, result: findResult });
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}).catch(err => {
    console.log("Error connecting to mongodb: ", err);
});