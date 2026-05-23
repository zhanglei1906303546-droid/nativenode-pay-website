import urllib.request
import urllib.parse
import json

BOT_TOKEN = "8907266232:AAFo3qn99RskaF_r97fcSjwEZcwfM9ElisU"
CHATS = [-5100438616, -5177646886]

def call_api(method, params=None):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {"error": str(e)}

def test_bot():
    # getMe
    print(f"Bot Info: {call_api('getMe')}")
    
    # getUpdates
    print(f"GetUpdates: {call_api('getUpdates', {'limit': 5})}")
    
    # Check permissions
    for chat_id in CHATS:
        print(f"Permissions in {chat_id}: {call_api('getChatMember', {'chat_id': chat_id, 'user_id': 8907266232})}")

if __name__ == "__main__":
    test_bot()
