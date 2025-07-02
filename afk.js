const mineflayer = require('mineflayer');
const axios = require('axios');
const { spawn } = require('child_process');

const bot = mineflayer.createBot({
  host: 'IP',
  port: 25565,
  username: 'NAME',
  version: false
});

// Ganti token dan chat_id berikut ini:
const TELEGRAM_TOKEN = 'TOKEN';
const TELEGRAM_CHAT_ID = 'ID';

function sendToTelegram(message) {
  axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  }).catch(error => {
    console.error('❌ Gagal kirim ke Telegram:', error.message);
  });
}

// Bot berhasil login
bot.once('spawn', () => {
  console.log('✅ Bot login. tunggu 3 detik...');
  setTimeout(() => {
    bot.chat('/login 12345678');
    console.log('✅ Login dikirim');
    bot.chat('/home afk');
    console.log('✅ /home afk dikirim');

    const pos = bot.entity.position;
    sendToTelegram(`✅ Bot AFK berhasil online di posisi X: ${pos.x.toFixed(2)}, Y: ${pos.y.toFixed(2)}, Z: ${pos.z.toFixed(2)}`);
  }, 3000);
});

// Kalau bot di-kick
bot.on('kicked', reason => {
  console.log('❌ Bot di-kick:', reason);
  sendToTelegram(`❌ Bot di-kick dari server.\nAlasan: ${reason}`);
});

// Kalau bot disconnect
bot.on('end', () => {
  console.log('🔁 Bot disconnect. Coba reconnect 10 detik lagi...');
  sendToTelegram('🔁 Bot disconnect. Coba reconnect dalam 10 detik...');
  setTimeout(() => {
    spawn('node', ['afk.js'], {
      stdio: 'inherit'
    });
  }, 10000);
});

// Log status tiap 1 jam
setInterval(() => {
  if (bot.entity && bot.entity.position) {
    const now = new Date().toLocaleString();
    const pos = bot.entity.position;
    sendToTelegram(`🕒 [${now}] Log: Bot AFK aktif. Posisi: X=${pos.x.toFixed(1)}, Y=${pos.y.toFixed(1)}, Z=${pos.z.toFixed(1)}`);
  }
}, 3600000); // tiap 1 jam
