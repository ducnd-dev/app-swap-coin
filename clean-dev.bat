@echo off
echo Starting clean dev setup...

REM Ensure dist directory exists
if not exist ".\app\generated" mkdir ".\app\generated"

REM Force regenerate Prisma client
echo Regenerating Prisma client...
call npx prisma generate --no-engine

REM Start Next.js dev server without turbopack
echo Starting Next.js development server...
call next dev
