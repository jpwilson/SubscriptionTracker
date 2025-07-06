const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Checking database...')
  
  try {
    // Try to count subscriptions
    const count = await prisma.subscription.count()
    console.log(`✅ Database is working! Found ${count} subscriptions.`)
  } catch (error) {
    console.log('❌ Database error:', error.message)
    console.log('\n📌 To fix this, run these commands:')
    console.log('1. rm -f prisma/dev.db prisma/dev.db-journal')
    console.log('2. rm -rf prisma/migrations')
    console.log('3. npx prisma migrate dev --name init')
    console.log('4. npm run dev')
  } finally {
    await prisma.$disconnect()
  }
}

main()