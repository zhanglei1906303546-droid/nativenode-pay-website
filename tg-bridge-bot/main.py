import logging
import html
import json
import traceback
from telegram import Update
from telegram.ext import ApplicationBuilder, MessageHandler, CommandHandler, filters, ContextTypes
from telegram.request import HTTPXRequest
from config import BOT_TOKEN
from database import init_db
from handlers import handle_message, setup_command, get_id_command, ignore_command, unignore_command, health_check_job

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.DEBUG,
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Set DEBUG for httpx to see raw requests
logging.getLogger("httpx").setLevel(logging.DEBUG)

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Log the error and send a telegram message to notify the developer."""
    logger.error("Exception while handling an update:", exc_info=context.error)

    tb_list = traceback.format_exception(None, context.error, context.error.__traceback__)
    tb_string = "".join(tb_list)

def main():
    # Initialize database
    init_db()

    # Configure request with optimized timeouts for stability
    request = HTTPXRequest(
        connect_timeout=60,
        read_timeout=60,
        write_timeout=60,
        pool_timeout=60
    )

    # Build the application
    application = ApplicationBuilder().token(BOT_TOKEN).request(request).build()

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
    
    # Add health check job (HEARTBEAT) to run every 1 minute
    if application.job_queue:
        application.job_queue.run_repeating(health_check_job, interval=60, first=10)
        logger.info("Heartbeat job scheduled (1 min).")
    
    # Start polling
    application.run_polling(drop_pending_updates=True)

if __name__ == '__main__':
    main()
