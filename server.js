// ── Portfolio Backend Server with MongoDB ──

const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// ── MongoDB connection string ──
const MONGO_URI = 'mongodb://judah:judah1234@ac-uxkdmkj-shard-00-00.cvwdlzc.mongodb.net:27017,ac-uxkdmkj-shard-00-01.cvwdlzc.mongodb.net:27017,ac-uxkdmkj-shard-00-02.cvwdlzc.mongodb.net:27017/?ssl=true&replicaSet=atlas-9y2ujd-shard-0&authSource=admin&appName=portfolio';

let db;

// ── Connect to MongoDB ──
async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db('portfolio');
    console.log('✅ Connected to MongoDB!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
}

// ── Middleware ──
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Contact Form Route ──
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const entry = {
    receivedAt: new Date(),
    name,
    email,
    subject,
    message,
  };

  try {
    await db.collection('messages').insertOne(entry);
    console.log(`📩 New message from ${name} (${email}): "${subject}"`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving message:', err.message);
    res.status(500).json({ error: 'Could not save message' });
  }
});

// ── View Messages Route ──
app.get('/messages', async (req, res) => {
  try {
    const messages = await db.collection('messages').find({}).toArray();
    res.json({ count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch messages' });
  }
});

// ── Start Server ──
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('');
    console.log('✅ Portfolio server is running!');
    console.log(`🌐 Open your site: http://localhost:${PORT}`);
    console.log(`📬 View messages:  http://localhost:${PORT}/messages`);
    console.log('');
    console.log('Press Ctrl + C to stop the server.');
  });
});
