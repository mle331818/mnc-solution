@echo off
echo Stopping any existing backend processes...
taskkill /f /im node.exe 2>nul

echo Starting backend server on port 4000...
cd server
node index.js 