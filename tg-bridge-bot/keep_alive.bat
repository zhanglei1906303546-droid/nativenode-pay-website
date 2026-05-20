@echo off
:loop
echo [%date% %time%] Starting Telegram Bridge Bot...
"C:\Users\Administrator\AppData\Local\Programs\Python\Python314\python.exe" main.py
echo [%date% %time%] Bot crashed or stopped. Restarting in 5 seconds...
timeout /t 5
goto loop
