@echo off
:: BatchGotAdmin
REM  --> Check for permissions
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "cmd.exe", "/c cd ""%~sdp0"" && kill all cnx.bat", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

gotAdmin:
pushd "%CD%"
CD /D "%~dp0"

TITLE Kill All Node/Dev Connections

echo ===================================
echo  Killing all Node.js processes...
echo ===================================

taskkill /f /im node.exe >nul 2>&1

echo.
echo Checking for any process using port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process on port 5000 with PID %%a
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo All Node.js and port 5000 processes have been killed.
echo ===================================
echo.
pause 