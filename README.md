# 🎓 My Portfolio Website

A clean, minimal portfolio with a Node.js backend.

---

## 📁 Project Structure

```
portfolio/
├── public/             ← Everything visitors see
│   ├── index.html      ← Main webpage
│   ├── resume.pdf      ← Your CV (add this yourself!)
│   ├── css/
│   │   └── style.css   ← All the styling
│   └── js/
│       └── main.js     ← Frontend interactivity
├── server.js           ← Backend server (Node.js)
├── messages.json       ← Contact form submissions (auto-created)
├── package.json        ← Project config
└── README.md           ← This file
```

---

## 🚀 How to Run (Step by Step)

### Step 1 — Install Node.js
If you don't have Node.js installed:
1. Go to https://nodejs.org
2. Download the **LTS** version
3. Run the installer (click Next through everything)
4. Restart VS Code after installing

### Step 2 — Open the project in VS Code
1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `portfolio` folder

### Step 3 — Open the Terminal in VS Code
- Press `` Ctrl + ` `` (backtick key, top-left of keyboard)
- Or go to **Terminal → New Terminal**

### Step 4 — Install dependencies
Type this in the terminal and press Enter:
```
npm install
```
Wait for it to finish (you'll see a `node_modules` folder appear).

### Step 5 — Start the server
```
npm start
```

### Step 6 — Open your site
Open your browser and go to:
```
http://localhost:3000
```

🎉 Your portfolio is live!

---

## ✏️ How to Personalise It

Open `public/index.html` and find these placeholders to replace:

| Placeholder | Replace with |
|-------------|-------------|
| `YourName` | Your actual name |
| `Your Name` | Your actual name |
| `YN` | Your initials |
| `[Your University]` | Your university name |
| `[Your Degree]` | Your degree title |
| Project One/Two/Three | Your real projects |
| `you@email.com` | Your email address |
| GitHub / LinkedIn links | Your profile URLs |

### Add your CV
Put your CV file in the `public/` folder and name it `resume.pdf`.
The "Download CV" button will automatically work.

---

## 📬 Viewing Contact Form Messages
When someone fills in the contact form, messages are saved to `messages.json`.

You can also view them in your browser at:
```
http://localhost:3000/messages
```

---

## 🛑 Stopping the Server
Press `Ctrl + C` in the terminal.
