@echo off
echo Checking API status...

echo.
echo Testing API connection:
curl -X GET "http://localhost:5029/api/auth/test" -H "Content-Type: application/json"

echo.
echo.
echo If you see API response above, the API is working.
echo If you see connection error, start the API first with: dotnet run
echo.
pause