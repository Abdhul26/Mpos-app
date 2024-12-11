'use client'

import '../../app/globals.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DevicesPage = () => {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('/api/devices') // Replace with your API
        setDevices(response.data.devices)
      } catch (error) {
        console.error('Error fetching devices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  if (loading)
    return (
      <div className='text-center p-4 text-2xl text-blue-500'>
        Loading devices...
      </div>
    )

  return (
    <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
        Device Management
      </h1>

      <div className='flex justify-between items-center mb-6'>
        <button className='bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300'>
          + Add Device
        </button>
        <div className='text-sm text-gray-600'>
          <p>Total Devices: {devices.length}</p>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
          <thead className='sticky top-0 bg-gray-800'>
            <tr>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                SI No
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                TID
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                Serial Number
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                Status
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                Merchant Emirate
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {devices.map((device, index) => (
              <tr
                key={device.id}
                className='hover:bg-gray-50 transition duration-200'
              >
                <td className='py-3 px-6 text-sm text-gray-800'>{index + 1}</td>
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.tid}
                </td>
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.serial_number}
                </td>
                <td className='py-3 px-6 text-sm'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      device.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.merchant_emirate}
                </td>
                <td className='py-3 px-6 text-sm flex items-center space-x-2'>
                  <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300'>
                    Edit
                  </button>
                  <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DevicesPage
