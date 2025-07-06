const mineflayer = require('mineflayer');
const axios = require('axios');
const { spawn } = require('child_process');

// Telegram Config
const TELEGRAM_TOKEN = '****';
const TELEGRAM_CHAT_ID = '****';

// Bot config
const bot = mineflayer.createBot({
  host: '****',
  port: 25565,
  username: '*****',
  version: false
});

function sendToTelegram(message) {
  axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  }).catch(error => {
    console.error('❌ Gagal kirim ke Telegram:', error.message);
  });
}

// cek inventory (log Termux)
function cekInventory() {
  const items = bot.inventory.items();

  if (items.length === 0) {
    console.log('📦 Inventory kosong.');
    return;
  }

  console.log('📦 Isi inventory:');
  items.forEach(item => {
    console.log(`- ${item.name} x${item.count} (Slot: ${item.slot})`);
  });
}

// login
bot.once('spawn', () => {
  console.log('✅ Bot login. Tunggu 3 detik...');
  setTimeout(() => {
    bot.chat('/login 12345678');
    console.log('✅ Login dikirim');
    bot.chat('/home afk');
    console.log('✅ /home afk dikirim');

    // Tunggu 4 detik lagi lalu kirim status & cek inventory
    setTimeout(() => {
      const pos = bot.entity.position;
      sendToTelegram(`✅ Bot AFK online di X: ${pos.x.toFixed(1)}, Y: ${pos.y.toFixed(1)}, Z: ${pos.z.toFixed(1)}`);
      cekInventory();
    }, 4000);
  }, 3000);
});

// Fungsi makan jika lapar
const eatIfHungry = async () => {
  if (bot.food < 20) {
    const foodItem = bot.inventory.items().find(item =>
      item.name.includes('beef') ||
      item.name.includes('chicken') ||
      item.name.includes('porkchop') ||
      item.name.includes('bread')
    );

    if (foodItem) {
      try {
        await bot.equip(foodItem, 'hand');
        await bot.consume();
        console.log('🍗 Bot makan manual.');
        sendToTelegram('🍗 Bot makan otomatis (manual).');
      } catch (err) {
        console.log('❌ Gagal makan:', err.message);
      }
    } else {
      console.log('❌ Tidak ada makanan.');
    }
  }
};

setInterval(eatIfHungry, 10 * 60 * 1000);

// Log status bot tiap 1 jam
setInterval(() => {
  if (bot.entity && bot.entity.position) {
    const now = new Date().toLocaleString();
    const pos = bot.entity.position;
    sendToTelegram(`🕒 [${now}] Bot aktif di X=${pos.x.toFixed(1)}, Y=${pos.y.toFixed(1)}, Z=${pos.z.toFixed(1)}`);
  }
}, 60 * 60 * 1000);

// bot di-kick??
bot.on('kicked', reason => {
  console.log('❌ Bot di-kick:', reason);
  sendToTelegram(`❌ Bot di-kick.\nAlasan: ${reason}`);
});

// bot disconnect
bot.on('end', () => {
  console.log('🔁 Bot disconnect. Reconnect 10 detik...');
  sendToTelegram('🔁 Bot disconnect. Coba reconnect dalam 10 detik...');
  setTimeout(() => {
    spawn('node', ['afk.js'], { stdio: 'inherit' });
  }, 10000);
});
