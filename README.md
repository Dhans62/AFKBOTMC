# 🤖 AFKBOTMC

Bot AFK otomatis untuk server Minecraft berbasis [mineflayer] Cocok untuk auto AFK, auto mancing, dan login otomatis di server vanilla maupun cracked.

---

## 📦 Fitur

- ✅ Auto login (`/login password`)
- ✅ Auto teleport ke `/home afk`
- ✅ Auto fishing (otomatis mancing)
- ✅ Auto reconnect saat disconnect
- ✅ Notifikasi Telegram saat bot disconnect (opsional)
- ✅ Bisa dijalankan di Termux (Android)

---

## 🛠️ Instalasi (Termux / Android)

### ✅ 1. Install Termux & dependencies

```bash
pkg update && pkg upgrade -y
pkg install nodejs git curl tmux -y


---

✅ 2. Clone repository

git clone https://github.com/username/AFKBOTMC.git
cd AFKBOTMC


---

✅ 3. Install dependencies

npm install


---

✅ 4. Izin eksekusi script

chmod +x startbot.sh


---

✅ 5. Jalankan bot

./startbot.sh
