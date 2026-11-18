@echo off
echo ========================================================
echo   CIT - College of Innovative Technology Portal & LLM
echo ========================================================
if exist .env (
    for /f "usebackq tokens=*" %%a in (.env) do (
        set "%%a"
    )
)
echo Starting Django Backend with Gemini 3.5 Flash Integration...
cd backend
python manage.py runserver 127.0.0.1:8000
pause
