const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'IP',
  port: 25565,
  username: 'NAME',
  version: false
});

bot.once('spawn', () => {
  console.log('✅ Bot login. tunggu 3 detik...');
  setTimeout(() => {
    bot.chat('/register 12345678 12345678');
    console.log('✅ Register dikirim');
    setTimeout(() => {
      bot.chat('/tpa NamaAkunUtama');
      console.log('✅ TPA dikirim');
      setTimeout(() => {
        bot.chat('/sethome afk');
        console.log('✅ /sethome afk dikirim');
      }, 3000);
    }, 3000);
  }, 3000);
});
