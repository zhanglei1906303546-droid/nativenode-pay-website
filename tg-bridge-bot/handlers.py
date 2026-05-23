import logging
import config
from telegram import Update
from telegram.ext import ContextTypes
from database import get_target_chat, is_user_ignored

logger = logging.getLogger(__name__)

async def health_check_job(context: ContextTypes.DEFAULT_TYPE):
    """Job to log health status periodically."""
    logger.info("--- HEARTBEAT OK ---")
    logger.info("Health Check: Bot is alive and job queue is running.")

async def relay_message_job(context: ContextTypes.DEFAULT_TYPE):
    """Job to relay a message after a delay, checking if user is ignored."""
    job = context.job
    data = job.data
    from_chat_id = data['from_chat_id']
    message_id = data['message_id']
    target_chat_id = data['target_chat_id']
    user_id = data['user_id']
    username = data['username']

    # Re-check ignore status before copying
    if is_user_ignored(user_id, username):
        logger.info(f"Relay aborted: User {username or user_id} was ignored during the 10s delay window.")
        return

    try:
        logger.info(f"Attempting to relay message {message_id} from {from_chat_id} to {target_chat_id}")
        # Using copy_message to forward message without original sender info
        await context.bot.copy_message(
            chat_id=target_chat_id,
            from_chat_id=from_chat_id,
            message_id=message_id
        )
        logger.info(f"Successfully relayed message {message_id} from {from_chat_id} to {target_chat_id}")
    except Exception as e:
        logger.error(f"Failed to copy delayed message {message_id} from {from_chat_id} to {target_chat_id}: {e}")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles incoming messages and routes them between groups with a 10s delay."""
    logger.info("--- UPDATE RECEIVED ---")
    if not update.effective_chat:
        return

    # Initial check for ignored users
    user = update.effective_user
    user_id = user.id if user else None
    username = user.username if user else None
    
    logger.info(f"Received message from user_id: {user_id}, username: {username} in chat: {update.effective_chat.id}")

    if (user_id and user_id in config.IGNORE_IDS) or is_user_ignored(user_id, username):
        logger.info(f"Ignoring message from blocked user {username or user_id}")
        return

    chat_id = update.effective_chat.id
    message = update.effective_message
    if not message:
        return

    target_chat_id = get_target_chat(chat_id)
    if target_chat_id:
        if context.job_queue:
            logger.info(f"Scheduling relay from {chat_id} to {target_chat_id} in 10 seconds")
            context.job_queue.run_once(
                relay_message_job,
                10,
                data={
                    'from_chat_id': chat_id,
                    'message_id': message.message_id,
                    'target_chat_id': target_chat_id,
                    'user_id': user_id,
                    'username': username
                }
            )
        else:
            # Fallback if job queue is not enabled
            logger.warning("Job queue is not enabled. Relaying message immediately.")
            try:
                await context.bot.copy_message(
                    chat_id=target_chat_id,
                    from_chat_id=chat_id,
                    message_id=message.message_id
                )
            except Exception as e:
                logger.error(f"Failed to copy message immediately: {e}")

async def setup_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Command to set up mapping: /bind <chat_id_a> <chat_id_b> <project_name>"""
    from database import add_mapping
    try:
        args = context.args
        if len(args) < 3:
            await update.message.reply_text("Usage: /bind <chat_id_a> <chat_id_b> <project_name>")
            return
        
        chat_id_a = int(args[0])
        chat_id_b = int(args[1])
        project_name = " ".join(args[2:])
        
        add_mapping(chat_id_a, chat_id_b, project_name)
        await update.message.reply_text(f"Successfully bound {chat_id_a} <-> {chat_id_b} for project '{project_name}'.")
    except Exception as e:
        await update.message.reply_text(f"Error: {str(e)}")

async def delete_message_job(context: ContextTypes.DEFAULT_TYPE):
    """Job to delete a message after a delay."""
    job = context.job
    chat_id, message_id = job.data
    try:
        await context.bot.delete_message(chat_id=chat_id, message_id=message_id)
    except Exception as e:
        logger.error(f"Failed to delete message {message_id} in chat {chat_id}: {e}")

async def get_id_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Command to get the current chat ID and auto-delete after 10 seconds."""
    chat_id = update.effective_chat.id
    msg = await update.message.reply_text(f"Current Chat ID: `{chat_id}`", parse_mode='Markdown')
    
    # Schedule deletion of both the user's command and the bot's reply after 10 seconds
    if context.job_queue:
        context.job_queue.run_once(delete_message_job, 10, data=(chat_id, update.message.message_id))
        context.job_queue.run_once(delete_message_job, 10, data=(chat_id, msg.message_id))
    else:
        logger.warning("Job queue is not enabled. Messages will not be deleted.")

async def ignore_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Command to dynamically block a user. Supports replying or direct username/ID."""
    from database import ignore_user
    chat_id = update.effective_chat.id
    
    if context.args:
        added_list = []
        for arg in context.args:
            if arg.startswith('@') or not arg.isdigit():
                username = arg.lstrip('@')
                ignore_user(username=username)
                added_list.append(arg)
            else:
                try:
                    uid = int(arg)
                    ignore_user(user_id=uid)
                    added_list.append(arg)
                except ValueError:
                    pass
        msg = await update.message.reply_text(f"Added to ignore list: {', '.join(added_list)}")
    elif update.message.reply_to_message:
        target_user = update.message.reply_to_message.from_user
        if target_user:
            ignore_user(user_id=target_user.id, username=target_user.username)
            identifier = f"@{target_user.username}" if target_user.username else target_user.id
            msg = await update.message.reply_text(f"User {identifier} has been added to the ignore list.")
        else:
            msg = await update.message.reply_text("Could not identify the user to ignore.")
    else:
        msg = await update.message.reply_text("Usage: `/ignore @username` or reply to a user's message.", parse_mode='Markdown')

    # Auto-delete command and response
    if context.job_queue:
        context.job_queue.run_once(delete_message_job, 10, data=(chat_id, update.message.message_id))
        context.job_queue.run_once(delete_message_job, 10, data=(chat_id, msg.message_id))

async def unignore_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Command to remove a user from the ignore list. Works by replying or direct identifier."""
    from database import unignore_user
    chat_id = update.effective_chat.id
    
    removed_list = []
    if context.args:
        for arg in context.args:
            if arg.startswith('@') or not arg.isdigit():
                username = arg.lstrip('@')
                unignore_user(username=username)
                removed_list.append(arg)
            else:
                try:
                    uid = int(arg)
                    unignore_user(user_id=uid)
                    removed_list.append(arg)
                except ValueError:
                    pass
        msg = await update.message.reply_text(f"Removed from ignore list: {', '.join(removed_list)}")
    elif update.message.reply_to_message:
        target_user = update.message.reply_to_message.from_user
        if target_user:
            unignore_user(user_id=target_user.id, username=target_user.username)
            identifier = f"@{target_user.username}" if target_user.username else target_user.id
            msg = await update.message.reply_text(f"User {identifier} has been removed from the ignore list.")
        else:
            msg = await update.message.reply_text("Could not identify the user to unignore.")
    else:
        msg = await update.message.reply_text("Usage: `/unignore @username` or reply to a user's message.", parse_mode='Markdown')

    # Auto-delete command and response
    if context.job_queue:
        context.job_queue.run_once(delete_message_job, 10, data=(chat_id, update.message.message_id))
        context.job_queue.run_once(delete_message_job, 10, data=(chat_id, msg.message_id))
