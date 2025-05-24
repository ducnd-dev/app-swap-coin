# Database Setup for Token API

## Current Issues

The application is experiencing issues with database connections and authentication. This document provides guidance on how to properly configure the database to fix the "Failed to load price data" errors.

## Setup Steps

### 1. Configure MongoDB Connection String

Make sure your `.env` file has a valid DATABASE_URL environment variable:

```
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
```

Replace:
- `<username>` with your MongoDB username
- `<password>` with your MongoDB password
- `<cluster>` with your MongoDB Atlas cluster address
- `<database>` with your database name (e.g., "app-swap-coin")

### 2. Generate Prisma Client

Run the following command with administrator privileges to generate the Prisma client:

```bash
npx prisma generate
```

If you encounter permission errors, try:
- Running the command prompt or terminal as administrator
- Checking folder permissions for the app/generated/prisma directory

### 3. Seed the Database

After successfully generating the Prisma client, seed the database with token data:

```bash
node app/scripts/seed-tokens.js
```

## Troubleshooting

If the database connection is still failing:

1. Verify that your MongoDB instance is running and accessible
2. Check if your IP address is whitelisted in MongoDB Atlas
3. Ensure the user has the correct permissions to read/write to the database
4. Test the connection using MongoDB Compass or another client tool

## Fallback Mechanism

The API has been updated to handle database connection failures gracefully:

1. When the database connection fails, the API falls back to mock data
2. Token symbols can now be extracted from tokenIds using the "symbol-123" pattern
3. Realistic mock prices are generated for popular tokens (BTC, ETH, USDT, etc.)

This ensures that the application continues to function even if database access is temporarily unavailable.
