#!/bin/bash

echo "Starting clean dev setup..."

# Ensure dist directory exists
mkdir -p ./app/generated

# Force regenerate Prisma client
echo "Regenerating Prisma client..."
npx prisma generate --no-engine

# Start Next.js dev server without turbopack 
# (more stable for Prisma integration)
echo "Starting Next.js development server..."
next dev
