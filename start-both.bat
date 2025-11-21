@echo off
echo Starting IoTendra API and Web...

start "API Server" cmd /k "cd IoTendra.Api && dotnet run"
timeout /t 5
start "Web Server" cmd /k "cd iotendraweb && npm start"

echo Both servers are starting...
echo API: http://localhost:5029
echo Web: http://localhost:55597
pause