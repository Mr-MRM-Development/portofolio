@echo off
echo Mengecek Node.js...
node -v
if %errorlevel% neq 0 (
    echo Node.js belum terinstal.
    echo Silakan install manual dari: https://nodejs.org
    pause
) else (
    echo Node.js sudah terinstal.
    node -v
)
pause
