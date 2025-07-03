@echo off
REM ===============================================
REM  MNCC2 - Data Migration Launcher
REM  Opens a dedicated console window that runs the
REM  migration script and shows live upload progress.
REM ===============================================

set "BACKEND_DIR=%~dp0backend"

REM Launch a new console window that stays open
start "MNCC2 - Data Migration" cmd /k "cd /d \"%BACKEND_DIR%\" ^& if not exist node_modules (echo Installing backend dependencies... ^& npm install --quiet) ^& echo. ^& echo Running migration... ^& node scripts\migrateAllData.js ^& echo. ^& echo ===== Migration Complete ===== ^& pause"

exit /b 