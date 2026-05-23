@echo off
setlocal enabledelayedexpansion

set PYTHON_EXE="C:\Users\Administrator\AppData\Local\Programs\Python\Python314\python.exe"
set LOG_FILE=bot.log
set MAX_STALE_MINUTES=5

echo [%date% %time%] Guardian started. Monitoring %LOG_FILE% and python process...

:loop
:: 1. Check if process is running
tasklist /FI "IMAGENAME eq python.exe" 2>NUL | find /I /N "python.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo [%date% %time%] WARNING: python.exe is NOT running.
    goto restart
)

:: 2. Check log file staleness using PowerShell
for /f "usebackq" %%i in (`powershell -ExecutionPolicy Bypass -Command "if (Test-Path %LOG_FILE%) { if ((Get-Item %LOG_FILE%).LastWriteTime -lt (Get-Date).AddMinutes(-%MAX_STALE_MINUTES%)) { echo STALE } else { echo OK } } else { echo MISSING }"`) do set LOG_STATUS=%%i

if "!LOG_STATUS!"=="STALE" (
    echo [%date% %time%] WARNING: %LOG_FILE% is STALE (last update > %MAX_STALE_MINUTES% min ago).
    goto restart
)

if "!LOG_STATUS!"=="MISSING" (
    echo [%date% %time%] WARNING: %LOG_FILE% is MISSING.
    goto restart
)

:: Everything seems fine
timeout /t 60 /nobreak >nul
goto loop

:restart
echo [%date% %time%] FORCING RESTART...
taskkill /F /IM python.exe /T 2>NUL
timeout /t 2 /nobreak >nul
start /B "TelegramBridge" %PYTHON_EXE% main.py
echo [%date% %time%] Bot restarted in background.
timeout /t 10 /nobreak >nul
goto loop
