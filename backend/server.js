const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId here
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passOP';
const port = process.env.PORT || 3000; // Use environment variable for port
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB once
client.connect()
    .then(() => {
        console.log("Connected successfully to MongoDB server");
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        // GET all passwords
        app.get('/', async (req, res) => {
            try {
                const findResult = await collection.find({}).toArray();
                res.json(findResult);
            } catch (error) {
                console.error("Error fetching passwords:", error);
                res.status(500).send({ success: false, message: 'Failed to retrieve passwords.' });
            }
        });

        // POST a new password
        app.post('/', async (req, res) => {
            const password = req.body;
            // Basic validation: ensure essential fields are present
            if (!password.site || !password.username || !password.password) {
                return res.status(400).send({ success: false, message: 'Site, username, and password are required.' });
            }
            try {
                const insertResult = await collection.insertOne(password);
                console.log("Password inserted:", insertResult.insertedId); // Log the inserted ID
                res.status(201).send({ success: true, result: insertResult, insertedId: insertResult.insertedId });
            } catch (error) {
                console.error("Error inserting password:", error);
                res.status(500).send({ success: false, message: 'Failed to save password.' });
            }
        });

        app.put('/', async (req, res) => {
            const { _id, ...updatedPasswordData } = req.body; 

            if (!_id) {
                return res.status(400).send({ success: false, message: 'Password ID (_id) is required for update.' });
            }

            try {
                const objectId = new ObjectId(_id); // Convert _id string to MongoDB ObjectId

                //  $set to update only the provided fields without replacing the whole document
                const updateResult = await collection.updateOne(
                    { _id: objectId },
                    { $set: updatedPasswordData }
                );

                if (updateResult.matchedCount === 0) {
                    return res.status(404).send({ success: false, message: 'Password not found.' });
                }

                if (updateResult.modifiedCount === 0) {
                    // This means a document matched, but no fields were actually changed
                    return res.status(200).send({ success: true, message: 'No changes detected for update.', result: updateResult });
                }

                res.send({ success: true, message: 'Password updated successfully!', result: updateResult });
            } catch (error) {
                console.error("Error updating password:", error);
                if (error.name === 'BSONTypeError' || error.message.includes('Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer')) {
                    return res.status(400).send({ success: false, message: 'Invalid Password ID format.' });
                }
                res.status(500).send({ success: false, message: 'Failed to update password.', error: error.message });
            }
        });

        app.delete('/', async (req, res) => {
            const { _id } = req.body; 

            if (!_id) {
                return res.status(400).send({ success: false, message: 'Password ID (_id) is required for deletion.' });
            }

            try {
                const objectId = new ObjectId(_id); // Convert _id string to MongoDB ObjectId

                const deleteResult = await collection.deleteOne({ _id: objectId });

                console.log("Delete result:", deleteResult); // Log the delete result

                if (deleteResult.deletedCount === 0) {
                    return res.status(404).send({ success: false, message: 'Password not found or already deleted.' });
                }

                res.send({ success: true, message: 'Password deleted successfully!', result: deleteResult });

            } catch (error) {
                
                res.status(500).send({ success: false, message: 'Failed to delete password.', error: error.message });
            }
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

    })
    .catch(err => {
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1); // Exit process if MongoDB connection fails
    });