@echo off
REM update-git.bat: Pull, stage all changes, commit with timestamp, and push to the current branch (no prompt)

REM Get current date and time for commit message
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set DATE=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME=%%a-%%b
set msg=Auto update %DATE% %TIME%

git pull --rebase
git add .
git commit -m "%msg%"
git push

pause