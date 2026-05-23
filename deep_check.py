import urllib.request
import urllib.parse
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BOT_TOKEN = "8907266232:AAFo3qn99RskaF_r97fcSjwEZcwfM9ElisU"

def call_api(method, params=None):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {"ok": False, "error": str(e)}

def check_bot():
    # 1. getMe
    me_resp = call_api("getMe")
    if not me_resp.get("ok"):
        print(f"Error calling getMe: {me_resp}")
        return
    
    me = me_resp["result"]
    print(f"Bot Info: {me.get('username')} ({me.get('id')})")
    bot_id = me.get('id')
    
    # 2. getChat for groups in DB
    # (1, -5100438616, 6908791975, '支付测试项目')
    # Note: 6908791975 is a positive ID, likely a user or channel. 
    # Group IDs are usually negative.
    group_ids = [-5100438616, 6908791975]
    
    for chat_id in group_ids:
        print(f"\nChecking Chat ID: {chat_id}")
        
        # Check Chat Info
        chat_resp = call_api("getChat", {"chat_id": chat_id})
        if chat_resp.get("ok"):
            chat = chat_resp["result"]
            print(f"Chat Title: {chat.get('title') or chat.get('first_name')}")
            print(f"Chat Type: {chat.get('type')}")
        else:
            print(f"Error getChat {chat_id}: {chat_resp}")
            continue

        # Check Member Status
        member_resp = call_api("getChatMember", {"chat_id": chat_id, "user_id": bot_id})
        if member_resp.get("ok"):
            member = member_resp["result"]
            print(f"Bot Status in Chat: {member.get('status')}")
            # Permissions are in the member object for administrators
            if member.get('status') == 'administrator':
                print(f"Can Post Messages: {member.get('can_post_messages')}")
                print(f"Can Edit Messages: {member.get('can_edit_messages')}")
        else:
            print(f"Error getChatMember {chat_id}: {member_resp}")

if __name__ == "__main__":
    check_bot()
