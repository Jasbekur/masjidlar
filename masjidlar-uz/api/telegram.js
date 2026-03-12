// This serverless function runs on Vercel's servers
// It receives volunteer signup data and sends it to the mosque's Telegram group

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { volunteerName, phone, email, message, taskTitle, taskDate, taskTime, mosqueName, mosqueChatId } = req.body;

    // Validate required fields
    if (!volunteerName || !phone || !taskTitle || !mosqueName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Your Telegram Bot Token (set this in Vercel Environment Variables)
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    
    // The main admin chat ID (always receives all signups)
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (!BOT_TOKEN) {
      return res.status(500).json({ error: "Telegram bot token not configured" });
    }

    // Format the message nicely
    const telegramMessage = `
🤝 *YANGI VOLONTYOR RO'YXATDAN O'TDI!*
━━━━━━━━━━━━━━━━━━━━

🕌 *Masjid:* ${mosqueName}
📋 *Vazifa:* ${taskTitle}
📅 *Sana:* ${taskDate}
🕐 *Vaqt:* ${taskTime}

👤 *Ism:* ${volunteerName}
📱 *Telefon:* ${phone}
${email ? `📧 *Email:* ${email}` : ""}
${message ? `💬 *Xabar:* ${message}` : ""}

━━━━━━━━━━━━━━━━━━━━
✅ Iltimos, bu volontyor bilan bog'laning!
    `.trim();

    // Send to main admin
    if (ADMIN_CHAT_ID) {
      await sendTelegramMessage(BOT_TOKEN, ADMIN_CHAT_ID, telegramMessage);
    }

    // Send to mosque-specific group (if they have their own chat)
    if (mosqueChatId && mosqueChatId !== ADMIN_CHAT_ID) {
      await sendTelegramMessage(BOT_TOKEN, mosqueChatId, telegramMessage);
    }

    return res.status(200).json({ success: true, message: "Notification sent!" });

  } catch (error) {
    console.error("Telegram API error:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}

async function sendTelegramMessage(botToken, chatId, text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Telegram error:", errorData);
    throw new Error(`Telegram API error: ${errorData.description}`);
  }

  return response.json();
}
