import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { id } = req.query

  console.log('Request body:', req.body) // Log the payload to ensure it is correct

  if (method === 'PUT') {
    const {
      tid,
      serial_number,
      sim,
      status,
      provisioned_at,
      provisioned_location,
      provisioned_by,
      merchant_id,
      merchant_emirate,
      merchant_name,
      tms_profile,
      handover_to,
      handover_date,
      // Removed replacement_for and replacement_type as they are not valid fields
    } = req.body

    // Validate that the payload is not null and contains required fields
    if (
      !req.body ||
      typeof req.body !== 'object' ||
      Object.keys(req.body).length === 0 ||
      !req.body.tid || // Ensure tid is present
      !req.body.serial_number // Ensure serial_number is present
    ) {
      return res.status(400).json({ message: 'Invalid payload' })
    }

    try {
      const updatedDevice = await prisma.device.update({
        where: { id: String(id) }, // Ensure id is a string
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
          merchant_name,
          tms_profile,
          handover_to,
          handover_date,
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
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
