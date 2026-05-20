import logging
import html
import json
import traceback
from telegram import Update
from telegram.ext import ApplicationBuilder, MessageHandler, CommandHandler, filters, ContextTypes
from config import BOT_TOKEN
from database import init_db
from handlers import handle_message, setup_command, get_id_command, ignore_command, unignore_command

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO,
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Log the error and send a telegram message to notify the developer."""
    logger.error("Exception while handling an update:", exc_info=context.error)

    tb_list = traceback.format_exception(None, context.error, context.error.__traceback__)
    tb_string = "".join(tb_list)

    # Log the full traceback to bot.log (handled by logger.error above with exc_info)
    
    # Optionally notify about the error
    # if update and isinstance(update, Update) and update.effective_chat:
    #    await context.bot.send_message(chat_id=update.effective_chat.id, text="An unexpected error occurred.")

def main():
    # Initialize database
    init_db()

    # Build the application
    application = ApplicationBuilder().token(BOT_TOKEN).build()

    # Add error handler
    application.add_error_handler(error_handler)

    # Add command handlers
    application.add_handler(CommandHandler("bind", setup_command))
    application.add_handler(CommandHandler("id", get_id_command))
    application.add_handler(CommandHandler("ignore", ignore_command))
    application.add_handler(CommandHandler("unignore", unignore_command))

    # Add message handlers for all content types
    # We use ~filters.COMMAND to ensure we don't treat commands as messages to forward
    application.add_handler(MessageHandler(filters.ALL & ~filters.COMMAND, handle_message))

    # Start the Bot
    print("Bot is starting...")
    application.run_polling(drop_pending_updates=True)

if __name__ == '__main__':
    main()
