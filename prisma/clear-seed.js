const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // First, delete all Device records (since Devices are related to Merchants)
  await prisma.device.deleteMany()

  // Then, delete all Merchant records
  await prisma.merchant.deleteMany()

  console.log('All data cleared!')
}

// Execute the function and close the Prisma client
main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
