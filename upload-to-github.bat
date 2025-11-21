@echo off
echo IoTendra projesini GitHub'a yukleniyor...

git init
git add .
git commit -m "Initial commit: IoTendra Smart Home System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/IoTendra.git
git push -u origin main

echo Yukleme tamamlandi!
pause