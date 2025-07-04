@echo off
git checkout main
git pull origin main
git add .
git commit -m "Auto update"
git push origin main
pause