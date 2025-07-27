const mineflayer = require('mineflayer');
const axios = require('axios');
const { spawn } = require('child_process');

// Konfigurasi Telegram
const TELEGRAM_TOKEN = 'TOKEN';
const TELEGRAM_CHAT_ID = 'CHAT ID';

// log Telegram
function sendToTelegram(message) {
  axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  }).catch(err => {
    console.log('❌ Gagal kirim Telegram:', err.message);
  });
}

const bot = mineflayer.createBot({
  host: 'SERVER IP',
  port: 25565,
  username: 'NAME',
  version: false
});

bot.once('spawn', () => {
  console.log('✅ Bot login, tunggu 3 detik...');
  setTimeout(() => {
    bot.chat('/login 12345678');
    console.log('✅ Login dikirim');
    sendToTelegram('✅ Bot mancing login ke server.');

    setTimeout(() => {
      bot.chat('/home afk');
      console.log('🎣 Menuju tempat mancing...');
      sendToTelegram('🎣 Menuju /home afk (tempat mancing)...');

      setTimeout(() => {
        startFishing();
      }, 5000);
    }, 3000);
  }, 3000);
});


function startFishing() {
  if (!bot.inventory) return;

  bot.fish().then(() => {
    console.log('✅ Strike berhasil! Lanjut mancing...');
    setTimeout(startFishing, 1000);
  }).catch((err) => {
    console.log('⚠️ Gagal mancing:', err.message);
    sendToTelegram(`⚠️ Gagal mancing: ${err.message}`);
    setTimeout(startFishing, 3000);
  });
}

// Jika disconnect
bot.on('end', () => {
  console.log('🔁 Bot disconnect, mencoba reconnect...');
  sendToTelegram('🔁 Bot disconnect. Mencoba reconnect dalam 10 detik...');
  setTimeout(() => {
    spawn('node', ['fishBot.js'], { stdio: 'inherit' });
  }, 10000);
});

// Jika di-kick
bot.on('kicked', reason => {
  console.log('❌ Bot di-kick:', reason);
  sendToTelegram(`❌ Bot di-kick:\n${reason}`);
});


