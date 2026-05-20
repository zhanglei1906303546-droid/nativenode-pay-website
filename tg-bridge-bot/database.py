import sqlite3
from config import DB_PATH

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS mappings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chat_id_a INTEGER NOT NULL,
            chat_id_b INTEGER NOT NULL,
            project_name TEXT,
            UNIQUE(chat_id_a, chat_id_b)
        )
    ''')
    # Update ignored_users table structure
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ignored_users_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username TEXT,
            UNIQUE(user_id),
            UNIQUE(username)
        )
    ''')
    # Check if old table exists and migrate data if necessary
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='ignored_users'")
    if cursor.fetchone():
        # Check if it has the new structure by checking for 'username' column
        cursor.execute("PRAGMA table_info(ignored_users)")
        columns = [column[1] for column in cursor.fetchall()]
        if 'username' not in columns:
            # Migration: copy user_id to new table
            cursor.execute("INSERT OR IGNORE INTO ignored_users_new (user_id) SELECT user_id FROM ignored_users")
            cursor.execute("DROP TABLE ignored_users")
            cursor.execute("ALTER TABLE ignored_users_new RENAME TO ignored_users")
    else:
        cursor.execute("ALTER TABLE ignored_users_new RENAME TO ignored_users")
        
    conn.commit()
    conn.close()

def get_target_chat(source_chat_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    # Check if source is chat_id_a
    cursor.execute('SELECT chat_id_b FROM mappings WHERE chat_id_a = ?', (source_chat_id,))
    result = cursor.fetchone()
    if result:
        conn.close()
        return result[0]
    
    # Check if source is chat_id_b
    cursor.execute('SELECT chat_id_a FROM mappings WHERE chat_id_b = ?', (source_chat_id,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def add_mapping(chat_id_a, chat_id_b, project_name):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO mappings (chat_id_a, chat_id_b, project_name)
        VALUES (?, ?, ?)
    ''', (chat_id_a, chat_id_b, project_name))
    conn.commit()
    conn.close()

def ignore_user(user_id=None, username=None):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if username:
        username = username.lstrip('@').lower()
    
    if user_id and username:
        cursor.execute('''
            INSERT INTO ignored_users (user_id, username) VALUES (?, ?)
            ON CONFLICT(user_id) DO UPDATE SET username=excluded.username
            ON CONFLICT(username) DO UPDATE SET user_id=excluded.user_id
        ''', (user_id, username))
    elif user_id:
        cursor.execute('INSERT OR IGNORE INTO ignored_users (user_id) VALUES (?)', (user_id,))
    elif username:
        cursor.execute('INSERT OR IGNORE INTO ignored_users (username) VALUES (?)', (username,))
    
    conn.commit()
    conn.close()

def unignore_user(user_id=None, username=None):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if username:
        username = username.lstrip('@').lower()
        cursor.execute('DELETE FROM ignored_users WHERE username = ?', (username,))
    if user_id:
        cursor.execute('DELETE FROM ignored_users WHERE user_id = ?', (user_id,))
    conn.commit()
    conn.close()

def is_user_ignored(user_id, username=None):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if user_id and username:
        username = username.lstrip('@').lower()
        cursor.execute('SELECT 1 FROM ignored_users WHERE user_id = ? OR username = ?', (user_id, username))
    elif user_id:
        cursor.execute('SELECT 1 FROM ignored_users WHERE user_id = ?', (user_id,))
    elif username:
        username = username.lstrip('@').lower()
        cursor.execute('SELECT 1 FROM ignored_users WHERE username = ?', (username,))
    else:
        conn.close()
        return False
    result = cursor.fetchone()
    conn.close()
    return result is not None
