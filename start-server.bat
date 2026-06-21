@echo off
echo ============================================
echo  Starting local server on http://localhost:8080
echo  Press Ctrl+C to stop
echo ============================================
echo.
python -m http.server 8080
pause
