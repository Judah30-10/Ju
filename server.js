// ── Portfolio Backend Server ──
// This file runs your backend. It serves your website files
// and handles the contact form submissions.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Middleware ──
// Parse incoming JSON data (from the contact form)
app.use(express.json());

// Serve all files inside the "public" folder (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ── Contact Form Route ──
// When the contact form is submitted, this runs
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation — make sure all fields are filled in
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Build the message entry
  const entry = {
    id: Date.now(),
    receivedAt: new Date().toLocaleString(),
    name,
    email,
    subject,
    message,
  };

  // Save it to a local JSON file called "messages.json"
  const filePath = path.join(__dirname, 'messages.json');

  let messages = [];

  // If the file already exists, read the existing messages first
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      messages = JSON.parse(raw);
    } catch {
      messages = [];
    }
  }

  // Add the new message and save
  messages.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  console.log(`📩 New message from ${name} (${email}): "${subject}"`);

  res.status(200).json({ success: true });
});

// ── View Messages Route ──
// Visit http://localhost:3000/messages in your browser to see all received messages
app.get('/messages', (req, res) => {
  const filePath = path.join(__dirname, 'messages.json');

  if (!fs.existsSync(filePath)) {
    return res.json({ count: 0, messages: [] });
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(raw);
    res.json({ count: messages.length, messages });
  } catch {
    res.status(500).json({ error: 'Could not read messages' });
  }
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log('');
  console.log('✅ Portfolio server is running!');
  console.log(`🌐 Open your site: http://localhost:${PORT}`);
  console.log(`📬 View messages:  http://localhost:${PORT}/messages`);
  console.log('');
  console.log('Press Ctrl + C to stop the server.');
});
