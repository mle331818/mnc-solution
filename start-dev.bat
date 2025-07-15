@echo off
TITLE MNC Solution Dev Environment

echo ===================================
echo  Starting Development Servers...
echo ===================================

REM Change directory to the script's location (your project root)
cd /d "%~dp0"

echo.
echo [1/2] Starting Backend Server (API)...
start "MNC Backend" cmd /k "cd backend && npm run dev"

echo.
echo [2/2] Starting Frontend Server (UI)...
start "MNC Frontend" cmd /k "npm run dev"

echo.
echo ===================================
echo  All servers are starting up.
echo  Please wait for the new terminal
echo  windows to finish loading.
echo ===================================

echo.
pause 