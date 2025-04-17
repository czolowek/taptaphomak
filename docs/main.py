from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes
import threading
import http.server
import socketserver
import os

# --- Telegram-бот ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        # Кнопка с ссылкой на локальный сервер
        keyboard = [
            [InlineKeyboardButton("Перейти к игре", url="http://127.0.0.1:5000")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        # Приветственное сообщение с кнопкой
        await update.message.reply_text(
            "Добро пожаловать в TapKraken! 🐙\n"
            "Нажмите на кнопку ниже, чтобы перейти к игре:",
            reply_markup=reply_markup
        )
    except Exception as e:
        print(f"Ошибка в команде /start: {e}")

def run_server():
    # Устанавливаем текущую директорию на папку с файлами
    os.chdir("c:/Users/ProLogix/Desktop/taptaphomak/docs")
    
    PORT = 5000
    Handler = http.server.SimpleHTTPRequestHandler

    # Проверяем, существует ли файл index.html
    if not os.path.exists("index.html"):
        print("Ошибка: Файл index.html не найден в текущей директории.")
        return

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Сервер запущен на http://127.0.0.1:{PORT}")
            httpd.serve_forever()
    except OSError as e:
        print(f"Ошибка при запуске сервера: {e}")

def main():
    try:
        # Запускаем локальный сервер в отдельном потоке
        server_thread = threading.Thread(target=run_server)
        server_thread.daemon = True
        server_thread.start()

        # Создаем приложение Telegram-бота
        application = Application.builder().token("8160638043:AAGVn4wvRKKamkSPrfoxWDv19LTp3mSFFU8").build()

        # Добавляем обработчик команды /start
        application.add_handler(CommandHandler("start", start))

        # Запускаем Telegram-бот в основном потоке
        print("Telegram-бот запущен. Ожидание команд...")
        application.run_polling()
    except Exception as e:
        print(f"Ошибка в основном потоке: {e}")

if __name__ == "__main__":
    main()