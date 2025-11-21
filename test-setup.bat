@echo off
echo Testing IoTendra Setup...

echo.
echo 1. Building API...
cd "IoTendra.Api"
dotnet build
if %errorlevel% neq 0 (
    echo API build failed!
    pause
    exit /b 1
)

echo.
echo 2. Installing Angular dependencies...
cd "..\iotendraweb"
npm install
if %errorlevel% neq 0 (
    echo npm install failed!
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Run start-api.bat in one terminal
echo 2. Run start-web.bat in another terminal
echo.
pause