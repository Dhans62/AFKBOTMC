const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'IP',
  port: 25565,
  username: 'Name',
  version: false
});

bot.once('spawn', () => {
  console.log('✅ Bot berhasil masuk, kirim perintah register...');
  setTimeout(() => {
    bot.chat('/register 12345678 12345678');
    console.log('✅ /register dikirim!');
  }, 3000);
});

bot.on('kicked', reason => console.log('❌ Bot di-kick:', reason));
bot.on('error', err => console.log('❌ ERROR:', err));
bot.on('end', () => console.log('🔁 Bot disconnect.'));
