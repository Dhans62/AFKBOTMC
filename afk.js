const mineflayer = require('mineflayer');
const axios = require('axios');

const bot = mineflayer.createBot({
  host: 'IP',
  port: 25565,
  username: 'NAME',
  version: false
});

const TELEGRAM_TOKEN = 'TOKEN';
const TELEGRAM_CHAT_ID = 'CHAT_ID';

function sendToTelegram(message) {
  axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  }).catch(error => {
    console.error('❌ Gagal kirim ke Telegram:', error.message);
  });
}

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

bot.on('end', () => {
  console.log('🔁 Bot disconnect. Coba reconnect 10 detik lagi...');
  setTimeout(() => {
    require('child_process').spawn('node', ['afk.js'], {
      stdio: 'inherit'
    });
  }, 10000);
});

setInterval(() => {
  if (bot.entity && bot.entity.position) {
    const now = new Date().toLocaleString();
    const pos = bot.entity.position;
    sendToTelegram(`🕒 [${now}] Log: Bot AFK aktif. Posisi: X=${pos.x.toFixed(1)}, Y=${pos.y.toFixed(1)}, Z=${pos.z.toFixed(1)}`);
  }
}, 3600000);
