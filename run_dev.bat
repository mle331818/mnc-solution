@echo off
REM ===============================
REM  MNCC2 full-stack dev launcher
REM ===============================

REM 1) Kill any existing Node processes to free ports
echo Killing existing Node.js processes...
taskkill /F /IM node.exe >NUL 2>&1

REM 2) Start backend (port 5000) in a new terminal window
echo Starting backend on port 5000...
start "MNCC2-backend" cmd /k "cd /d %~dp0backend && npm run dev"

REM 3) Start frontend (Vite) on fixed port 5173 in another terminal window
echo Starting frontend on port 5173...
start "MNCC2-frontend" cmd /k "cd /d %~dp0 && npm run dev -- --port 5173"

REM 4) Helpful message
echo ---------------------------------------------------
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin UI: http://localhost:5173/admin/login
echo ---------------------------------------------------

pause 