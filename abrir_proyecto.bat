@echo off
chcp 65001 > nul
title Iniciador - SST Perú Demo
echo =========================================================
echo               SST PERÚ DEMO - INICIADOR LOCAL
echo =========================================================
echo.
echo Este script iniciará la aplicación localmente.
echo.

:: Buscar si Python está instalado para levantar un servidor http local
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Se detectó la presencia de Python en el sistema.
    echo [INFO] Levantando servidor web local en: http://localhost:8000
    echo [INFO] Abriendo navegador predeterminado...
    echo.
    echo Presione CTRL + C en esta ventana de comandos para cerrar el servidor.
    echo.
    start "" "http://localhost:8000"
    python -m http.server 8000
) else (
    echo [INFO] Python no fue detectado en el sistema.
    echo [INFO] Abriendo index.html directamente como archivo local...
    echo.
    start "" "index.html"
    echo.
    echo El proyecto ha sido abierto en su navegador.
    echo Si tiene problemas para descargar los archivos, le recomendamos instalar
    echo Python para evitar bloqueos de seguridad del navegador.
    echo.
    pause
)
