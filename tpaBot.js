const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'IP',
  port: 25565,
  username: 'Name',
  version: false
});

bot.once('spawn', () => {
  console.log('✅ Bot berhasil login, kirim /login...');
  setTimeout(() => {
    bot.chat('/login 12345678');
    console.log('✅ /login dikirim');

    // send /tpa ke akun utama
    setTimeout(() => {
      bot.chat('/tpa NamaAkunUtama');
      console.log('📨 /tpa dikirim ke akun utama');

      //delay 10 second
      setTimeout(() => {
        bot.chat('/sethome afk');
        console.log('✅ /sethome afk dikirim');
      }, 10000);

    }, 4000);
  }, 3000);
});

bot.on('kicked', reason => console.log('❌ Bot di-kick:', reason));
bot.on('error', err => console.log('❌ ERROR:', err));
bot.on('end', () => console.log('🔁 Bot disconnect.'));
