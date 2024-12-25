import '../../app/globals.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddDevice from '../components/AddDevice'
import UpdateDevice from '../components/UpdateDevice'
import ViewDevice from '../components/ViewDevice'
import * as XLSX from 'xlsx'

// Device Interface
interface Device {
  id: string
  si_no: number
  tid: string
  serial_number: string
  sim: string | null
  status: 'AVAILABLE' | 'PROVISIONED' | 'FAULTY' | 'REASSIGNED'
  provisioned_at: string | null
  provisioned_location: string | null
  provisioned_by: string | null
  merchant_id: string | null
  merchant_name: string | null
  merchant_emirate: string | null
  tms_profile: string | null
  handover_to: string | null
  handover_date: string | null
  replacement_for: string | null
  replacement_type: 'GREEN_FIELD' | 'REPLACEMENT' | null
}

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showViewDetails, setShowViewDetails] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [editDevice, setEditDevice] = useState<Device | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    tid: '',
    serial_number: '',
    sim: '',
    merchant_id: '',
    merchant_name: '',
    merchant_emirate: '',
    tms_profile: '',
    status: 'AVAILABLE',
    provisioned_at: '',
    provisioned_location: '',
    provisioned_by: '',
    handover_to: '',
    handover_date: '',
    replacement_for: '',
    replacement_type: 'GREEN_FIELD',
  })

  // Effect to fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('/api/devices')
        setDevices(response.data.devices)
      } catch (error) {
        console.error('Error fetching devices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  // Function to handle bulk upload
  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    // Check file type validation for .csv or .xlsx
    const fileExtension = file.name.split('.').pop()
    if (!(fileExtension === 'csv' || fileExtension === 'xlsx')) {
      alert('Invalid file type! Please upload a CSV or XLSX file.')
      return
    }

    try {
      // Parse the file (add your file parsing logic here)
      const parsedDevices = await parseExcelFile(file)
      console.log('Parsed Devices:', parsedDevices) // Check the structure before sending

      // Validate the parsed devices
      if (!Array.isArray(parsedDevices) || parsedDevices.length === 0) {
        alert('No valid devices found in the file.')
        return
      }

      // Post the parsed devices data to the server
      await axios.post('/api/devices/bulk', { devices: parsedDevices })

      alert('Bulk upload successful')
    } catch (error) {
      // Error handling for parsing or posting the data
      console.error(
        'Error uploading file:',
        error.response?.data || error.message
      )
      alert(
        'Failed to upload file: ' +
          (error.response?.data?.message || error.message)
      )
    }
  }

  // Add a helper function to parse the file (you can replace this with your own file parsing logic)
  const parseExcelFile = async (file: File) => {
    // Dummy function to simulate file parsing, replace it with your actual parsing logic (e.g., using libraries like `xlsx`)
    return new Promise<any[]>((resolve, reject) => {
      // Simulating file parsing here with a fake dataset
      setTimeout(() => {
        if (file) {
          resolve([
            { deviceId: '123', deviceName: 'Device A' },
            { deviceId: '456', deviceName: 'Device B' },
          ])
        } else {
          reject(new Error('File parsing error'))
        }
      }, 1000) // Simulate file parsing delay
    })
  }

  // Handlers for viewing and updating device
  const handleViewClick = (device: Device) => {
    setSelectedDevice(device)
    setShowViewDetails(true)
  }

  const handleUpdateDevice = (updatedDevice: Device) => {
    setDevices((prevDevices) =>
      prevDevices.map((d) => (d.id === updatedDevice.id ? updatedDevice : d))
    )
  }

  const handleEditClick = (device: Device) => {
    setEditDevice(device)
    setShowAddForm(false)
  }

  // Loading state
  if (loading)
    return (
      <div className='text-center p-4 text-2xl text-blue-500'>
        Loading devices...
      </div>
    )

  return (
    // <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
    //   <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
    //     Device Management
    //   </h1>

    //   {/* Add Device button and Bulk Upload button */}
    //   <div className='flex justify-between items-center mb-6'>
    //     <div className='flex gap-4'>
    //       <button
    //         onClick={() => setShowAddForm(true)}
    //         className='bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300'
    //       >
    //         + Add Device
    //       </button>
    //       <label
    //         htmlFor='bulkUpload'
    //         className='bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300 cursor-pointer'
    //       >
    //         + Bulk Upload
    //       </label>
    //       <input
    //         id='bulkUpload'
    //         type='file'
    //         accept='.csv,.xlsx'
    //         onChange={handleBulkUpload}
    //         className='hidden'
    //       />
    //     </div>
    //   </div>

    //   {/* Device table */}
    //   <div className='overflow-x-auto'>
    //     <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
    //       <thead className='sticky top-0 bg-gray-800'>
    //         <tr>
    //           <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
    //             SI No
    //           </th>
    //           <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
    //             TID
    //           </th>
    //           <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
    //             Serial Number
    //           </th>
    //           <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
    //             Status
    //           </th>
    //           <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
    //             Actions
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody className='divide-y divide-gray-200'>
    //         {devices.map((device, index) => (
    //           <tr
    //             key={device.id}
    //             className='hover:bg-gray-50 transition duration-200'
    //           >
    //             <td className='py-3 px-6 text-sm text-gray-800'>{index + 1}</td>
    //             <td className='py-3 px-6 text-sm text-gray-800'>
    //               {device.tid}
    //             </td>
    //             <td className='py-3 px-6 text-sm text-gray-800'>
    //               {device.serial_number}
    //             </td>
    //             <td className='py-3 px-6 text-sm'>
    //               <span
    //                 className={`px-2 py-1 rounded-full text-xs font-bold ${
    //                   device.status === 'AVAILABLE'
    //                     ? 'bg-green-100 text-green-600'
    //                     : 'bg-red-100 text-red-600'
    //                 }`}
    //               >
    //                 {device.status}
    //               </span>
    //             </td>
    //             <td className='py-3 px-6 text-sm flex items-center space-x-2'>
    //               <button
    //                 onClick={() => handleViewClick(device)}
    //                 className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300'
    //               >
    //                 View
    //               </button>
    //               <button
    //                 onClick={() => handleEditClick(device)}
    //                 className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300'
    //               >
    //                 Update
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //   {/* Add Device Modal */}
    //   {showAddForm && (
    //     <AddDevice setDevices={setDevices} setShowAddForm={setShowAddForm} />
    //   )}
    //   {/* View Device Modal */}
    //   {showViewDetails && selectedDevice && (
    //     <ViewDevice
    //       device={selectedDevice}
    //       onClose={() => setShowViewDetails(false)}
    //       onUpdate={handleUpdateDevice}
    //     />
    //   )}
    //   {/* Update Device Modal */}
    //   {editDevice && (
    //     <UpdateDevice
    //       device={editDevice}
    //       setShowUpdateForm={setShowViewDetails}
    //       setShowAddDeviceForm={setShowAddForm}
    //       onClose={() => setEditDevice(null)}
    //     />
    //   )}
    // </div>

    <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
        Device Management
      </h1>

      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <button
            onClick={() => setShowAddForm(true)}
            className='bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300'
          >
            + Add Device
          </button>
          <label
            htmlFor='bulkUpload'
            className='bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300 cursor-pointer'
          >
            + Bulk Upload
          </label>
          <input
            id='bulkUpload'
            type='file'
            accept='.csv,.xlsx'
            onChange={handleBulkUpload}
            className='hidden'
          />
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
                Device Model
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                Merchant Name
              </th>
              <th className='py-4 px-6 text-left text-xs font-medium text-gray-100'>
                Status
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
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.device_model} {/* New field */}
                </td>
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.merchant_name} {/* New field */}
                </td>
                <td className='py-3 px-6 text-sm'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      device.status === 'AVAILABLE'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className='py-3 px-6 text-sm flex items-center space-x-2'>
                  <button
                    onClick={() => handleViewClick(device)}
                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300'
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(device)}
                    className='bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300'
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Device Modal */}
      {showAddForm && (
        <AddDevice setDevices={setDevices} setShowAddForm={setShowAddForm} />
      )}
      {/* View Device Modal */}
      {showViewDetails && selectedDevice && (
        <ViewDevice
          device={selectedDevice}
          onClose={() => setShowViewDetails(false)}
          onUpdate={handleUpdateDevice}
        />
      )}
      {/* Update Device Modal */}
      {editDevice && (
        <UpdateDevice
          device={editDevice}
          setShowUpdateForm={setShowViewDetails}
          setShowAddDeviceForm={setShowAddForm}
          onClose={() => setEditDevice(null)}
        />
      )}
    </div>
  )
}

export default DevicesPage
