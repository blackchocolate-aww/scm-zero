@echo off
REM SCM System Frontend - Docker Quick Start Script (Windows)
REM Usage: docker-start.bat [dev|prod|stop|clean]

setlocal enabledelayedexpansion

set COMMAND=%1
if "%COMMAND%"=="" set COMMAND=dev

echo.
echo ==========================================
echo   SCM System Frontend - Docker Setup
echo ==========================================
echo.

if /i "%COMMAND%"=="dev" (
    echo Starting Development Environment...
    echo - Development server with hot reload
    echo - Available at: http://localhost:5173
    echo.
    docker-compose up app-dev
) else if /i "%COMMAND%"=="prod" (
    echo Starting Production Environment...
    echo - Optimized production build
    echo - Available at: http://localhost:3000
    echo.
    docker-compose up app
) else if /i "%COMMAND%"=="stop" (
    echo Stopping all containers...
    docker-compose down
    echo Containers stopped
) else if /i "%COMMAND%"=="clean" (
    echo Cleaning up all containers and images...
    docker-compose down -v
    for /f "tokens=*" %%i in ('docker images -q capstone-frontend 2^>nul') do docker rmi %%i 2>nul
    echo Cleanup complete
) else if /i "%COMMAND%"=="build" (
    echo Building Docker images...
    docker-compose build --no-cache
    echo Build complete
) else if /i "%COMMAND%"=="logs" (
    echo Showing container logs...
    if "%2"=="" (
        docker-compose logs -f app-dev
    ) else (
        docker-compose logs -f %2
    )
) else if /i "%COMMAND%"=="shell" (
    echo Opening shell in development container...
    docker-compose exec app-dev sh
) else (
    echo Invalid command: %COMMAND%
    echo.
    echo Available commands:
    echo   dev     - Start development environment ^(http://localhost:5173^)
    echo   prod    - Start production environment ^(http://localhost:3000^)
    echo   stop    - Stop all containers
    echo   clean   - Remove containers and images
    echo   build   - Rebuild Docker images
    echo   logs    - Show container logs ^(use: logs [app-dev^|app]^)
    echo   shell   - Open shell in development container
    echo.
    exit /b 1
)

endlocal
