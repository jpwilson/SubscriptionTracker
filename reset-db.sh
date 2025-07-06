#!/bin/bash

echo "🔄 Resetting database..."

# Remove existing database
rm -f prisma/dev.db
rm -f prisma/dev.db-journal

# Remove migrations folder
rm -rf prisma/migrations

# Create fresh migration
echo "📦 Creating fresh migration..."
npx prisma migrate dev --name init --skip-generate

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "✅ Database reset complete!"
echo "🚀 You can now restart your development server with: npm run dev"