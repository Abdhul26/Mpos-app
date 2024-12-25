const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Utility function to pick a random item from an array
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Function to generate a random alphanumeric string (8 characters)
function generateTid() {
  const firstTwo = 'AD'
  const randomStart = Math.random() < 0.5 ? 5 : 6 // Randomly choose between 5 or 6 as the starting number
  let result = firstTwo + randomStart

  // Append 5 random digits (0-9)
  for (let i = 0; i < 5; i++) {
    result += Math.floor(Math.random() * 10) // Random digit between 0 and 9
  }

  return result
}

async function main() {
  // First, seed the merchants
  const merchantData = [
    { name: 'AD CUSTOM', emirate: 'ABU DHABI' },
    { name: 'ABC SHOP', emirate: 'DUBAI' },
    { name: 'XYZ TECH', emirate: 'ABU DHABI' },
    { name: 'AL-FUTTAIM', emirate: 'DUBAI' },
  ]

  const merchants = []
  for (let merchant of merchantData) {
    const createdMerchant = await prisma.merchant.create({
      data: {
        name: merchant.name,
        emirate: merchant.emirate,
      },
    })
    merchants.push(createdMerchant) // Store the created merchants for later use
  }

  // Device models to use in seeding
  const deviceModels = [
    { model_name: 'PAX X990' },
    { model_name: 'DROP_D920_PRO' },
    { model_name: 'PAX Terminal' },
  ]

  // Create device models
  const createdDeviceModels = []
  for (let model of deviceModels) {
    const createdDeviceModel = await prisma.deviceModel.create({
      data: model,
    })
    createdDeviceModels.push(createdDeviceModel)
  }

  const locations = ['DUBAI', 'ABU DHABI', 'SHARJA']
  const provisionedBy = [
    'ABDUL GHANI',
    'SAJID',
    'SYED IBRAHIM',
    'GHOUSE',
    'ASLAM',
  ]
  const handoverTo = ['ALVIN', 'FARAZ', 'SOHAID']
  const tmsProfiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const statuses = ['AVAILABLE', 'FAULTY', 'PROVISIONED']

  // Seed 30 Device records
  for (let i = 0; i < 30; i++) {
    const merchant = randomChoice(merchants) // Pick random merchant
    const deviceModel = randomChoice(createdDeviceModels) // Pick random device model

    await prisma.device.create({
      data: {
        tid: generateTid(),
        serial_number: `${Math.floor(Math.random() * 1000000000)}`, // Generate random serial number
        sim: `${Math.floor(Math.random() * 10000000000000000)}`, // Generate random SIM number
        status: randomChoice(statuses),
        provisioned_location: randomChoice(locations),
        provisioned_by: randomChoice(provisionedBy),
        merchant_id: merchant.id, // Using the created merchant ID
        merchant_name: merchant.name,
        tms_profile: String(randomChoice(tmsProfiles)),
        handover_to: randomChoice(handoverTo),
        handover_date: new Date(), // Current timestamp
        provisioned_at: new Date(), // Current timestamp
        device_model_id: deviceModel.id, // Assigning device model ID
      },
    })
  }

  console.log('30 Device records have been seeded!')
}

// Run main function and close Prisma client
main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
