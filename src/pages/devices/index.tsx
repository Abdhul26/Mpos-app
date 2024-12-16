'use client'

import '../../app/globals.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searchField, setSearchField] = useState('tid')

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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredDevices = devices.filter((device) => {
    const searchValue = searchTerm.toLowerCase()
    return (
      device.tid.toLowerCase().includes(searchValue) ||
      device.merchant_id?.toLowerCase().includes(searchValue) ||
      '' ||
      device.merchant_emirate?.toLowerCase().includes(searchValue) ||
      '' ||
      device.tms_profile?.toLowerCase().includes(searchValue) ||
      ''
    )
  })

  const handleAddDevice = async () => {
    try {
      // Calculate next si_no
      const nextSiNo =
        devices.length > 0
          ? Math.max(...devices.map((device) => device.si_no)) + 1
          : 1

      // Validate required fields
      if (!formData.tid || !formData.serial_number) {
        alert('TID and Serial Number are required')
        return
      }

      // Format dates to proper ISO-8601 format
      const formatDateTime = (dateString: string) => {
        if (!dateString) return null
        return dateString + ':00.000Z'
      }

      // First create merchant if merchant name and emirate are provided
      let merchantId = null
      if (formData.merchant_name && formData.merchant_emirate) {
        try {
          const merchantResponse = await axios.post('/api/merchants', {
            name: formData.merchant_name,
            emirate: formData.merchant_emirate,
          })
          merchantId = merchantResponse.data.merchant.id
        } catch (error: any) {
          if (error.response?.status === 409) {
            // If merchant already exists, fetch their ID
            const existingMerchant = await axios.get(
              `/api/merchants/search?name=${formData.merchant_name}`
            )
            merchantId = existingMerchant.data.merchant?.id
          } else {
            throw error
          }
        }
      }

      const deviceData = {
        si_no: nextSiNo,
        tid: formData.tid,
        serial_number: formData.serial_number,
        sim: formData.sim || null,
        status: formData.status || 'AVAILABLE',
        provisioned_at: formatDateTime(formData.provisioned_at),
        provisioned_location: formData.provisioned_location || null,
        provisioned_by: formData.provisioned_by || null,
        merchant_id: merchantId,
        merchant_name: formData.merchant_name || null,
        merchant_emirate: formData.merchant_emirate || null,
        tms_profile: formData.tms_profile || null,
        handover_to: formData.handover_to || null,
        handover_date: formatDateTime(formData.handover_date),
        replacement_for: formData.replacement_for || null,
        replacement_type: formData.replacement_type || null,
      }

      const response = await axios.post('/api/devices', deviceData)

      if (response.data.device) {
        setDevices([...devices, response.data.device])
        setShowAddForm(false)
        // Reset form
        setFormData({
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
        alert('Device added successfully')
      }
    } catch (error: any) {
      console.error('Error adding device:', error)
      alert(error.response?.data?.message || 'Failed to add device')
    }
  }

  const handleEditDevice = async () => {
    if (!editDevice) return

    try {
      const response = await axios.put(
        `/api/devices/${editDevice.id}`,
        formData
      )
      setDevices(
        devices.map((device) =>
          device.id === editDevice.id ? response.data.device : device
        )
      )
      setEditDevice(null)
      setFormData({
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
      setShowAddForm(false)
    } catch (error) {
      console.error('Error editing device:', error)
    }
  }

  const handleEditClick = (device: Device) => {
    setEditDevice(device)
    setFormData({
      tid: device.tid,
      serial_number: device.serial_number,
      sim: device.sim || '',
      merchant_id: device.merchant_id || '',
      merchant_name: device.merchant_name || '',
      merchant_emirate: device.merchant_emirate || '',
      tms_profile: device.tms_profile || '',
      status: device.status,
      provisioned_at: device.provisioned_at || '',
      provisioned_location: device.provisioned_location || '',
      provisioned_by: device.provisioned_by || '',
      handover_to: device.handover_to || '',
      handover_date: device.handover_date || '',
      replacement_for: device.replacement_for || '',
      replacement_type: device.replacement_type || 'GREEN_FIELD',
    })
    setShowAddForm(true)
  }

  const handleViewClick = (device: Device) => {
    setSelectedDevice(device)
    setShowViewDetails(true)
  }

  const handleCloseForm = () => {
    setShowAddForm(false)
    setEditDevice(null)
    setFormData({
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
  }

  const handleCloseViewDetails = () => {
    setShowViewDetails(false)
    setSelectedDevice(null)
  }

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      await axios.post('/api/devices/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const response = await axios.get('/api/devices')
      setDevices(response.data.devices)
      alert('Bulk upload successful')
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
    }
  }

  const fetchSuggestions = async (value: string, field: string) => {
    if (!value) {
      setSuggestions([])
      return
    }

    try {
      const response = await axios.get(`/api/devices/search`, {
        params: {
          query: value,
          field: field,
        },
      })
      setSuggestions(response.data.suggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    }
  }

  if (loading)
    return (
      <div className='text-center p-4 text-2xl text-blue-500'>
        Loading devices...
      </div>
    )

  const faultyDevices = devices.filter(
    (device) => device.status === 'FAULTY'
  ).length
  const provisionedDevices = devices.filter(
    (device) => device.status === 'PROVISIONED'
  ).length

  return (
    <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
        Device Management
      </h1>

      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <button
            onClick={() => {
              setShowAddForm(true)
              setEditDevice(null)
              setFormData({
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
            }}
            className='bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300'
          >
            + Add Device
          </button>
          <label className='bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300 cursor-pointer'>
            + Bulk Upload
            <input
              type='file'
              accept='.csv'
              onChange={handleBulkUpload}
              className='hidden'
            />
          </label>
        </div>
        <div className='flex items-center gap-4'>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className='px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='tid'>TID</option>
            <option value='serial_number'>Serial Number</option>
            <option value='merchant_name'>Merchant Name</option>
            <option value='merchant_emirate'>Emirate</option>
            <option value='tms_profile'>TMS Profile</option>
            <option value='status'>Status</option>
          </select>
          <div className='relative'>
            <input
              type='text'
              placeholder={`Search by ${searchField}...`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                fetchSuggestions(e.target.value, searchField)
              }}
              className='px-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {suggestions.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setSearchTerm(suggestion)
                      setSuggestions([])
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='text-sm text-gray-600 space-y-1'>
            <p>Total Devices: {devices.length}</p>
            <p>Faulty Devices: {faultyDevices}</p>
            <p>Provisioned Devices: {provisionedDevices}</p>
          </div>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredDevices.map((device, index) => (
              <tr
                key={device.id}
                className='hover:bg-gray-50 transition duration-200'
              >
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.si_no}
                </td>
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.tid}
                </td>
                <td className='py-3 px-6 text-sm text-gray-800'>
                  {device.serial_number}
                </td>
                <td className='py-3 px-6 text-sm'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      device.status === 'AVAILABLE'
                        ? 'bg-green-100 text-green-600'
                        : device.status === 'FAULTY'
                        ? 'bg-red-100 text-red-600'
                        : device.status === 'PROVISIONED'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-yellow-100 text-yellow-600'
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

      {showAddForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-[800px] my-8'>
            <h2 className='text-2xl font-semibold mb-6 text-center'>
              {editDevice ? 'Edit Device' : 'Add Device'}
            </h2>
            <form className='grid grid-cols-2 gap-6'>
              {/* Device Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                  Device Information
                </h3>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    TID
                  </label>
                  <input
                    type='text'
                    name='tid'
                    value={formData.tid}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Serial Number
                  </label>
                  <input
                    type='text'
                    name='serial_number'
                    value={formData.serial_number}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    SIM Info
                  </label>
                  <input
                    type='text'
                    name='sim'
                    value={formData.sim}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Status
                  </label>
                  <select
                    name='status'
                    value={formData.status}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  >
                    <option value='AVAILABLE'>Available</option>
                    <option value='PROVISIONED'>Provisioned</option>
                    <option value='FAULTY'>Faulty</option>
                    <option value='REASSIGNED'>Reassigned</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    TMS Profile
                  </label>
                  <input
                    type='text'
                    name='tms_profile'
                    value={formData.tms_profile}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Replacement Type
                  </label>
                  <select
                    name='replacement_type'
                    value={formData.replacement_type}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  >
                    <option value='GREEN_FIELD'>Green Field</option>
                    <option value='REPLACEMENT'>Replacement</option>
                  </select>
                </div>
              </div>

              {/* Merchant & Provisioning Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                  Merchant & Provisioning
                </h3>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Merchant ID
                  </label>
                  <input
                    type='text'
                    name='merchant_id'
                    value={formData.merchant_id}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Merchant Emirate
                  </label>
                  <input
                    type='text'
                    name='merchant_emirate'
                    value={formData.merchant_emirate}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Provisioning Date
                  </label>
                  <input
                    type='datetime-local'
                    name='provisioned_at'
                    value={formData.provisioned_at}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    KIR Location
                  </label>
                  <input
                    type='text'
                    name='provisioned_location'
                    value={formData.provisioned_location}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Provisioned By
                  </label>
                  <input
                    type='text'
                    name='provisioned_by'
                    value={formData.provisioned_by}
                    onChange={handleFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>

              {/* Handover Information */}
              <div className='col-span-2 space-y-4'>
                <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                  Handover Information
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Handover To
                    </label>
                    <input
                      type='text'
                      name='handover_to'
                      value={formData.handover_to}
                      onChange={handleFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Handover Date
                    </label>
                    <input
                      type='datetime-local'
                      name='handover_date'
                      value={formData.handover_date}
                      onChange={handleFormChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-2 flex justify-end space-x-4 mt-6'>
                <button
                  type='button'
                  onClick={handleCloseForm}
                  className='bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={editDevice ? handleEditDevice : handleAddDevice}
                  className='bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition duration-300'
                >
                  {editDevice ? 'Save Changes' : 'Add Device'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewDetails && selectedDevice && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-[800px] my-8'>
            <h2 className='text-2xl font-semibold mb-6 text-center'>
              Device Details
            </h2>
            <div className='grid grid-cols-2 gap-6'>
              {/* Device Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                  Device Information
                </h3>
                <div>
                  <p className='text-sm font-medium text-gray-500'>TID</p>
                  <p className='text-base'>{selectedDevice.tid}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Serial Number
                  </p>
                  <p className='text-base'>{selectedDevice.serial_number}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>SIM Info</p>
                  <p className='text-base'>{selectedDevice.sim || 'N/A'}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>Status</p>
                  <p className='text-base'>{selectedDevice.status}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    TMS Profile
                  </p>
                  <p className='text-base'>
                    {selectedDevice.tms_profile || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Replacement Type
                  </p>
                  <p className='text-base'>
                    {selectedDevice.replacement_type || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Merchant & Provisioning Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                  Merchant & Provisioning
                </h3>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Merchant ID
                  </p>
                  <p className='text-base'>
                    {selectedDevice.merchant_id || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Merchant Emirate
                  </p>
                  <p className='text-base'>
                    {selectedDevice.merchant_emirate || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Provisioning Date
                  </p>
                  <p className='text-base'>
                    {selectedDevice.provisioned_at || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    KIR Location
                  </p>
                  <p className='text-base'>
                    {selectedDevice.provisioned_location || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Provisioned By
                  </p>
                  <p className='text-base'>
                    {selectedDevice.provisioned_by || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Handover Information */}
              <div className='col-span-2 space-y-4'>
                <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                  Handover Information
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Handover To
                    </p>
                    <p className='text-base'>
                      {selectedDevice.handover_to || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Handover Date
                    </p>
                    <p className='text-base'>
                      {selectedDevice.handover_date || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-6'>
              <button
                type='button'
                onClick={handleCloseViewDetails}
                className='bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default DevicesPage
