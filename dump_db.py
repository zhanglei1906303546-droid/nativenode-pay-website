import sqlite3
conn = sqlite3.connect('tg-bridge-bot/bridge.db')
cursor = conn.cursor()
cursor.execute('SELECT * FROM mappings')
rows = cursor.fetchall()
for row in rows:
    print(row)
conn.close()
