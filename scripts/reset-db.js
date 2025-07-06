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
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()
  
  console.log('✅ Database cleared!')
  
  // Create a free tier test user
  console.log('👤 Creating free tier user...')
  const freeUser = await prisma.user.create({
    data: {
      id: 'test-user-123',
      email: 'demo@subtracker.app',
      password: 'demo123', // In production, this would be hashed
      tier: 'free',
    },
  })
  
  // Create a premium tier test user
  console.log('👤 Creating premium tier user...')
  const premiumUser = await prisma.user.create({
    data: {
      id: 'premium-user-123',
      email: 'pro@subtracker.app',
      password: 'pro123', // In production, this would be hashed
      tier: 'premium',
    },
  })
  
  console.log('✅ Both users created!')
  console.log('\n=== 🆓 FREE ACCOUNT ===')
  console.log('📧 Email: demo@subtracker.app')
  console.log('🔑 Password: demo123')
  console.log('\n=== ⭐ PREMIUM ACCOUNT ===')
  console.log('📧 Email: pro@subtracker.app')
  console.log('🔑 Password: pro123')
  
  await prisma.$disconnect()
}

resetDatabase().catch((e) => {
  console.error(e)
  process.exit(1)
})