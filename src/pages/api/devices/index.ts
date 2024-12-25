// pages/api/devices/index.ts
// Device API endpoints for managing device lifecycle
// Handles CRUD operations for devices with status: AVAILABLE, PROVISIONED, FAULTY, REASSIGNED
// Supports device replacement tracking and merchant assignment

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        return await getDevices(req, res)
      case 'POST':
        return await createDevice(req, res)
      case 'PUT':
        return await updateDevice(req, res)
      case 'DELETE':
        return await deleteDevice(req, res)
      default:
        return res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error(
      'Handler Error:',
      error instanceof Error ? error.message : error
    )
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function getDevices(req, res) {
  try {
    const [devices, totalDevices] = await Promise.all([
      prisma.device.findMany({
        skip: 0,
        take: 10,
        include: {
          merchant: {
            select: {
              emirate: true, // Field exists in the Merchant model
              id: true, // Primary key of the Merchant model
            },
          },
        },
        orderBy: {
          id: 'asc', // Order by the Device `id`
        },
      }),
      prisma.device.count(),
    ])

    res.status(200).json({ devices, totalDevices })
  } catch (error) {
    console.error('Error fetching devices:', error.message)
    res.status(500).json({ error: 'Failed to fetch devices' })
  } finally {
    await prisma.$disconnect()
  }
}

async function createDevice(req: NextApiRequest, res: NextApiResponse) {
  // Check for valid request body
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Invalid request body' })
  }

  const {
    si_no,
    tid,
    serial_number,
    sim,
    status,
    provisioned_at,
    provisioned_location,
    provisioned_by,
    merchant_id,
    merchant_emirate,
    tms_profile,
    handover_to,
    handover_date,
    merchant_name,
  } = req.body

  // Ensure required fields (TID, Serial Number, Merchant ID) are provided
  if (!tid || !serial_number || !merchant_id) {
    return res.status(400).json({
      message: 'TID, Serial Number, and Merchant ID are required',
    })
  }

  try {
    // Convert merchant_id to an integer if it is a string
    const merchantIdInt = parseInt(merchant_id, 10)

    // Check if the merchant_id is a valid integer
    if (isNaN(merchantIdInt)) {
      return res.status(400).json({
        message: 'Invalid Merchant ID format. It should be an integer.',
      })
    }

    // Check if the merchant exists
    const existingMerchant = await prisma.merchant.findUnique({
      where: {
        id: merchantIdInt, // Use the integer value here
      },
    })

    if (!existingMerchant) {
      return res.status(404).json({
        message: 'Merchant not found',
      })
    }

    // Create the device and associate it with the merchant
    const newDevice = await prisma.device.create({
      data: {
        si_no,
        tid,
        serial_number,
        sim,
        status: status || 'AVAILABLE',
        provisioned_at,
        provisioned_location,
        provisioned_by,
        merchant: {
          connect: { id: merchantIdInt }, // Connect the existing merchant by id (integer)
        },
        merchant_name,
        merchant_emirate,
        tms_profile,
        handover_to,
        handover_date,
      },
    })

    // Return successful response
    return res.status(201).json({
      message: 'Device created successfully',
      device: newDevice,
    })
  } catch (error) {
    // Error handling for specific errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return res.status(409).json({
        message: 'Device with this TID or Serial Number already exists',
      })
    }

    // Catching general errors
    console.error(
      'Error creating device:',
      error instanceof Error ? error.message : error
    )
    return res.status(500).json({
      message: 'Failed to create device',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

async function updateDevice(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request body is an object and not null
  if (!req.body || typeof req.body !== 'object' || req.body === null) {
    return res.status(400).json({ message: 'Invalid request body' })
  }

  console.log({ res })

  const {
    id,
    tid,
    serial_number,
    sim,
    status,
    provisioned_at,
    provisioned_location,
    provisioned_by,
    merchant_id,
    merchant_emirate,
    tms_profile,
    handover_to,
    handover_date,
    merchant_name, // Added merchant_name to the update process
  } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Device ID is required' })
  }

  try {
    const existingDevice = await prisma.device.findUnique({
      where: { id },
    })

    if (!existingDevice) {
      return res.status(404).json({ message: 'Device not found' })
    }

    const updatedDevice = await prisma.device.update({
      where: { id },
      data: {
        tid,
        serial_number,
        sim,
        status,
        provisioned_at,
        provisioned_location,
        provisioned_by,
        merchant_id,
        merchant_emirate,
        tms_profile,
        handover_to,
        handover_date,
        // merchant_name, // Removed merchant_name from the update data due to type mismatch
      },
    })

    return res.status(200).json({
      message: 'Device updated successfully',
      device: updatedDevice,
    })
  } catch (error) {
    console.error('Error updating device:', error)
    return res.status(500).json({
      message: 'Failed to update device',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

async function deleteDevice(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'Device ID is required' })
  }

  try {
    const existingDevice = await prisma.device.findUnique({
      where: { id: String(id) },
    })

    if (!existingDevice) {
      return res.status(404).json({ message: 'Device not found' })
    }

    const deletedDevice = await prisma.device.delete({
      where: { id: String(id) },
    })

    return res.status(200).json({
      message: 'Device deleted successfully',
      device: deletedDevice,
    })
  } catch (error) {
    console.error(
      'Error deleting device:',
      error instanceof Error ? error.message : error
    )
    return res.status(500).json({
      message: 'Failed to delete device',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
