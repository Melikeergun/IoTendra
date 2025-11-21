@echo off
echo Testing API connection...

echo.
echo 1. Testing API health...
curl -X GET "http://localhost:5029/api/auth/test" -H "Content-Type: application/json"

echo.
echo.
echo 2. Testing register...
curl -X POST "http://localhost:5029/api/auth/register" -H "Content-Type: application/json" -d "{\"userName\":\"testuser\",\"email\":\"test@test.com\",\"password\":\"123456\"}"

echo.
echo.
echo 3. Testing login...
curl -X POST "http://localhost:5029/api/auth/login" -H "Content-Type: application/json" -d "{\"userName\":\"testuser\",\"password\":\"123456\"}"

echo.
echo.
pause