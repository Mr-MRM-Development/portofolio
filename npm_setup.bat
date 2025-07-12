@echo off
echo Mengecek NPM...
npm -v
if %errorlevel% neq 0 (
    echo NPM belum terinstal atau tidak terdeteksi.
    echo Silakan reinstall Node.js dari https://nodejs.org untuk dapatkan NPM.
    pause
) else (
    echo NPM sudah terinstal.
    npm -v
)
pause
