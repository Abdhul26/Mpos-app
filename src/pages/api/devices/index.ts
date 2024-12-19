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

async function getDevices(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = '1', limit = '10', status, merchant_id, search } = req.query
    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ message: 'Invalid page or limit value' })
    }

    const skip = (pageNum - 1) * limitNum
    const filter: any = {}
    if (status) {
      filter.status = status
    }
    if (merchant_id) {
      filter.merchant_id = merchant_id
    }
    if (search) {
      filter.OR = [
        { tid: { contains: search as string, mode: 'insensitive' } },
        { serial_number: { contains: search as string, mode: 'insensitive' } },
        { sim: { contains: search as string, mode: 'insensitive' } },
        { merchant_name: { contains: search as string, mode: 'insensitive' } }, // Added merchant_name to search filter
      ]
    }

    const [devices, totalDevices] = await Promise.all([
      prisma.device.findMany({
        where: filter,
        skip,
        take: limitNum,
        include: {
          merchant: {
            select: {
              name: true,
              emirate: true,
            },
          },
        },
        orderBy: {
          si_no: 'asc',
        },
      }),
      prisma.device.count({ where: filter }),
    ])

    const totalPages = Math.ceil(totalDevices / limitNum)

    return res.status(200).json({
      devices,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: totalDevices,
        itemsPerPage: limitNum,
      },
    })
  } catch (error) {
    console.error(
      'Error fetching devices:',
      error instanceof Error ? error.message : error
    )
    return res.status(500).json({
      message: 'Failed to fetch devices',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

async function createDevice(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request body is an object
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
    merchant_name, // Added merchant_name to the creation process
  } = req.body

  if (!tid || !serial_number || !merchant_name) {
    // Added merchant_name to the required fields
    return res.status(400).json({
      message: 'TID, Serial Number, and Merchant Name are required',
    })
  }

  try {
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
        merchant_id,
        merchant_emirate,
        tms_profile,
        handover_to,
        handover_date,
        // merchant_name, // Removed merchant_name from the creation data due to type mismatch
      },
    })

    return res.status(201).json({
      message: 'Device created successfully',
      device: newDevice,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return res.status(409).json({
        message: 'Device with this TID or Serial Number already exists',
      })
    }
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
