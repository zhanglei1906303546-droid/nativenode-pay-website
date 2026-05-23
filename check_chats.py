import asyncio
import sys
import os
sys.path.append(os.path.abspath('tg-bridge-bot'))
from telegram import Bot
from config import BOT_TOKEN

async def check_chats():
    bot = Bot(token=BOT_TOKEN)
    await bot.initialize()
    me = await bot.get_me()
    chats = [-5100438616, -5177646886]
    for chat_id in chats:
        try:
            chat = await bot.get_chat(chat_id)
            print(f"Chat {chat_id}: Found. Title: {chat.title}")
            admins = await bot.get_chat_administrators(chat_id)
            bot_is_admin = any(admin.user.id == me.id for admin in admins)
            print(f"Bot is admin in {chat_id}: {bot_is_admin}")
        except Exception as e:
            print(f"Chat {chat_id}: Error: {e}")
    await bot.shutdown()

if __name__ == "__main__":
    asyncio.run(check_chats())
