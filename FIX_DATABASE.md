# Fix Database Issues - SubTracker

The subscription creation is failing because the database schema is out of sync. The `endDate` field was added to the Prisma schema but the database hasn't been migrated.

## Quick Fix Steps

Run these commands in your terminal from the project root directory:

```bash
# 1. First, stop your development server (press Ctrl+C)

# 2. Navigate to your project directory
cd /Users/jpwilson/Documents/Projects/SGTG/substracker/substracker-next

# 3. Remove the existing database and migrations
rm -f prisma/dev.db prisma/dev.db-journal
rm -rf prisma/migrations

# 4. Create a fresh migration with the updated schema
npx prisma migrate dev --name init

# 5. Restart your development server
npm run dev
```

## What This Does

1. Removes the old SQLite database that has the outdated schema
2. Removes old migration files
3. Creates a new database with the correct schema including the `endDate` field
4. Regenerates the Prisma client with the updated types

## After Running These Commands

- The "Add Subscription" feature will work properly
- All your test data will be cleared (you'll start fresh)
- The database will have the correct schema

## Alternative: If You Want to Keep Your Data

If you have important test data you want to keep, run this instead:

```bash
# Just add the missing column
npx prisma migrate dev --name add-end-date

# If that fails, try:
npx prisma db push
```

## Verification

After fixing, you should be able to:
1. Add new subscriptions
2. Edit existing subscriptions
3. Mark subscriptions as inactive with an end date