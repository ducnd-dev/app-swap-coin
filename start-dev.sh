#!/bin/bash

# Check and generate Prisma client if needed
if [ ! -d "./app/generated/prisma" ]; then
  echo "Prisma client not found, generating..."
  npx prisma generate
else
  echo "Prisma client already exists"
fi

# Start the Next.js application
exec npm run dev
