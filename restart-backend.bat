@echo off
echo 🔄 Restarting Backend Server...
echo.

echo 🛑 Stopping any existing Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo.
echo 🚀 Starting backend server with updated CORS...
cd backend
node server.js 