// pages/api/devices/index.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
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
        res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Handler Error:', error.message || error)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  } finally {
    await prisma.$disconnect()
  }
}

async function getDevices(req, res) {
  try {
    const { page = '1', limit = '10', status, merchant_id, search } = req.query
    const pageNum = parseInt(page, 10)
    const limitNum = parseInt(limit, 10)

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ message: 'Invalid page or limit value' })
    }

    const skip = (pageNum - 1) * limitNum
    let filter: any = {}
    if (status) {
      filter.status = status
    }
    if (merchant_id) {
      filter.merchant_id = merchant_id
    }
    if (search) {
      filter.OR = [
        { tid: { contains: search, mode: 'insensitive' } },
        { serial_number: { contains: search, mode: 'insensitive' } },
        { sim: { contains: search, mode: 'insensitive' } },
      ]
    }

    const devices = await prisma.device.findMany({
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
    })

    const totalDevices = await prisma.device.count({ where: filter })
    const totalPages = Math.ceil(totalDevices / limitNum)

    const paginationInfo = {
      currentPage: pageNum,
      totalPages,
      totalItems: totalDevices,
      itemsPerPage: limitNum,
    }

    res.status(200).json({
      devices,
      pagination: paginationInfo,
    })
  } catch (error) {
    console.error('Error fetching devices:', error.message || error)
    res
      .status(500)
      .json({ message: 'Failed to fetch devices', error: error.message })
  }
}

async function createDevice(req, res) {
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
  } = req.body

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
      },
    })

    res
      .status(201)
      .json({ message: 'Device created successfully', device: newDevice })
  } catch (error) {
    console.error('Error creating device:', error.message || error)
    res
      .status(500)
      .json({ message: 'Failed to create device', error: error.message })
  }
}

async function updateDevice(req, res) {
  const {
    id,
    status,
    merchant_id,
    provisioned_at,
    handover_to,
    handover_date,
  } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Device ID is required' })
  }

  try {
    const updatedDevice = await prisma.device.update({
      where: { id },
      data: {
        status,
        merchant_id,
        provisioned_at,
        handover_to,
        handover_date,
      },
    })

    res
      .status(200)
      .json({ message: 'Device updated successfully', device: updatedDevice })
  } catch (error) {
    console.error('Error updating device:', error.message || error)
    res
      .status(500)
      .json({ message: 'Failed to update device', error: error.message })
  }
}

async function deleteDevice(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'Device ID is required' })
  }

  try {
    const deletedDevice = await prisma.device.delete({
      where: { id: String(id) },
    })

    res
      .status(200)
      .json({ message: 'Device deleted successfully', device: deletedDevice })
  } catch (error) {
    console.error('Error deleting device:', error.message || error)
    res
      .status(500)
      .json({ message: 'Failed to delete device', error: error.message })
  }
}
