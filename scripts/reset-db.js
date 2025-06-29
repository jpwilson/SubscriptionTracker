const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function resetDatabase() {
  console.log('🗑️  Clearing all data...')
  
  // Delete in correct order due to foreign key constraints
  await prisma.usageTracking.deleteMany()
  await prisma.reminder.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.wishList.deleteMany()
  await prisma.userPreferences.deleteMany()
  await prisma.user.deleteMany()
  
  console.log('✅ Database cleared!')
  
  // Create a single test user
  console.log('👤 Creating test user...')
  const testUser = await prisma.user.create({
    data: {
      id: 'test-user-123',
      email: 'demo@subtracker.app',
      password: 'demo123', // In production, this would be hashed
    },
  })
  
  console.log('✅ Test user created!')
  console.log('📧 Email: demo@subtracker.app')
  console.log('🔑 Password: demo123')
  
  await prisma.$disconnect()
}

resetDatabase().catch((e) => {
  console.error(e)
  process.exit(1)
})