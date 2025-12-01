
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

// =========================
// استيراد ملفات البيانات
// =========================
import images from "./Data/images.js";
import videos from "./Data/Videos.js";
import texts from "./Data/texts.js";
import links from "./Data/Links.js";
import audios from "./Data/Oudeos.js";

const app = express();
app.use(bodyParser.json());

// توكن البوت من Render
const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM = `https://api.telegram.org/bot${TOKEN}/`;

// =========================
// دالة إرسال رسالة كتابية
// =========================
async function sendMessage(chatId, text) {
  await axios.post(TELEGRAM + "sendMessage", {
    chat_id: chatId,
    text: text,
  });
}

// =========================
// دالة إرسال صورة
// =========================
async function sendPhoto(chatId, url) {
  await axios.post(TELEGRAM + "sendPhoto", {
    chat_id: chatId,
    photo: url,
  });
}

// =========================
//   فيديو
// =========================
async function sendVideo(chatId, url) {
  await axios.post(TELEGRAM + "sendVideo", {
    chat_id: chatId,
    video: url,
  });
}

// =========================
//  صوت
// =========================
async function sendAudio(chatId, url) {
  await axios.post(TELEGRAM + "sendAudio", {
    chat_id: chatId,
    audio: url,
  });
}

// =========================
// نقطة الويبهوك
// =========================
app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const msg = req.body.message;
    if (!msg) return;

    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    //  start
    if (text === "/start") {
      return sendMessage(chatId, "أهلاً! أرسل أمر أي ملف وسأرسله إليك 🌟");
    }

    // ============ الصور ============
    if (images[text]) {
      return sendPhoto(chatId, images[text]);
    }

    // ============ الفيديوهات ============
    if (videos[text]) {
      return sendVideo(chatId, videos[text]);
    }

    // ============ الصوتيات ============
    if (audios[text]) {
      return sendAudio(chatId, audios[text]);
    }

    // ============ النصوص ============
    if (texts[text]) {
      return sendMessage(chatId, texts[text]);
    }

    // ============ الروابط ============
    if (links[text]) {
      return sendMessage(chatId, links[text]);
    }

    // 
    sendMessage(chatId, "الأمر غير معروف ❌");
  } catch (err) {
    console.log("Error:", err);
  }
});

// =========================
// 
// =========================
app.listen(3000, () => {
  console.log("Bot server is running...");
});


---



1️⃣ ملفات المحتوى (مجلد Data)

مثلاً داخل:

Project/Data/images.js

اجعله هكذا:

export default {
  "/img1": "https://raw.githubusercontent.com/USER/REPO/main/Project/images/photo1.jpg",
  "/cat": "https://raw.githubusercontent.com/USER/REPO/main/Project/images/cat.png",
};
