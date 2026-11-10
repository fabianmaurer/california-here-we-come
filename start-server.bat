@echo off
setlocal
cd /d "%~dp0"

echo Serving the trip map at http://localhost:8000/
echo Open that address in your browser. Press Ctrl+C to stop the server.
echo.

where py >nul 2>&1
if not errorlevel 1 (
    py -3 -m http.server 8000 --bind 127.0.0.1
) else (
    where python >nul 2>&1
    if errorlevel 1 (
        echo Python 3 is required. Install it, then run this file again.
        pause
        exit /b 1
    )
    python -m http.server 8000 --bind 127.0.0.1
)

if errorlevel 1 pause
