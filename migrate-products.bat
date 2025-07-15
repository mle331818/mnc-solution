@echo off
echo 🚀 Starting Product Migration to MongoDB Atlas...
echo.

cd backend
node scripts/migrate-products.js

echo.
echo ✅ Migration completed!
pause 