const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.post("/webhook", async (req, res) => {
  const msg = req.body.message;
  const chatId = msg.chat.id;
  const text = msg.text;

  await axios.post(`${API}/sendMessage`, {
    chat_id: chatId,
    text: "رسالتك: " + text
  });

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Bot Ready"));
