
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// نجلب التوكن من Environment Variables
const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;

// الصفحة الرئيسية (اختيارية)
app.get("/", (req, res) => {
  res.send("Bot is running on Render");
});

// استقبال الرسائل من Telegram
app.post("/webhook", async (req, res) => {
  const msg = req.body.message;

  // لو مافي رسالة، نرجع 200 وخلاص
  if (!msg) return res.sendStatus(200);

  const chatId = msg.chat.id;
  const text = msg.text || "";

  try {
    // الرد على المستخدم
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: "رسالتك: " + text
    });
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error);
  }

  res.sendStatus(200);
});

// ضروري جدًا — Render يعطي PORT من environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot Ready on port ${PORT}`));
