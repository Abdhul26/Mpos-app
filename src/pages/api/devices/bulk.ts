// pages/api/devices/bulk.js
import { NextApiRequest, NextApiResponse } from 'next'

const bulkUploadDevices = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Assuming the devices are sent as an array in the request body
      const devices = req.body

      if (!Array.isArray(devices) || devices.length === 0) {
        return res.status(400).json({ message: 'Invalid devices array' })
      }

      // Perform any validation or other necessary steps for each device here
      // Example: validate device structure
      for (const device of devices) {
        if (!device.name || !device.id) {
          return res.status(400).json({ message: 'Invalid device format' })
        }
      }

      // You can handle database storage here, this example assumes it's added
      // For now, it just logs the devices, assuming you're using a simple in-memory data structure or a database.
      console.log(devices)

      // Respond with a success message or the uploaded devices
      return res
        .status(200)
        .json({ message: 'Bulk devices uploaded successfully', devices })
    } catch (error) {
      console.error('Error uploading devices: ', error)
      return res.status(500).json({ message: 'Server error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

export default bulkUploadDevices
