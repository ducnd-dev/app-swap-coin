@echo off
REM Check and generate Prisma client if needed
if not exist ".\app\generated\prisma" (
  echo Prisma client not found, generating...
  npx prisma generate
) else (
  echo Prisma client already exists
)

REM Start the Next.js application
npm run dev
