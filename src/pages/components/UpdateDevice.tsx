// src/components/UpdateDevice.tsx
'use client'
import '../../app/globals.css'

import React, { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Device {
  id: string
  tid: string
  serial_number: string
  sim: string | null
  status: string
  merchant_name: string | null
  merchant_emirate: string | null
  provisioned_at: string | null
  provisioned_location: string | null
  provisioned_by: string | null
  handover_to: string | null
  handover_date: string | null
  replacement_for: string | null
  replacement_type: string
}

interface UpdateDeviceProps {
  device: Device
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
  setShowAddDeviceForm: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
}

const UpdateDevice: React.FC<UpdateDeviceProps> = ({
  device,
  setShowUpdateForm,
  setShowAddDeviceForm,
  onClose,
}) => {
  const [updatedDevice, setUpdatedDevice] = useState(device)

  const handleUpdateClick = () => {
    setShowUpdateForm(true)
    setShowAddDeviceForm(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setUpdatedDevice((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUpdate = async () => {
    try {
      // Assuming there's an API to update the device
      const response = await axios.put(
        `/api/devices/${updatedDevice.id}`,
        updatedDevice
      )
      if (!response.data.success) {
        throw new Error('Failed to update device')
      }
      alert('Device updated successfully')
      setShowUpdateForm(false)
    } catch (error) {
      console.error('Error updating device:', error)
      alert('Failed to update device')
    }
  }

  return (
    <div
      className='bg-white p-8 rounded-lg shadow-lg absolute inset-0 m-auto max-w-4xl overflow-y-auto'
      style={{ maxHeight: 'fit-content' }}
    >
      <h2 className='text-2xl font-semibold mb-6 text-center'>Update Device</h2>
      <div className='grid grid-cols-2 gap-6' style={{ maxWidth: '90%' }}>
        <div className='col-span-2'>
          <h3 className='text-xl font-semibold mb-4'>Merchant Details</h3>
          <hr className='mb-4 border-t border-gray-200' />
        </div>
        <div className='col-span-1'>
          <div>
            <label>Merchant ID</label>
            <input
              type='text'
              name='merchant_id'
              value={device.id} // Corrected from device.merchant_id to device.id
              disabled
              className='w-full p-2 border border-gray-300 rounded-md bg-gray-200'
            />
          </div>
          <div>
            <label>Merchant Name</label>
            <input
              type='text'
              name='merchant_name'
              value={updatedDevice.merchant_name || ''}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>Merchant Emirate</label>
            <input
              type='text'
              name='merchant_emirate'
              value={updatedDevice.merchant_emirate || ''}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>TMS Profile</label>
            <input
              type='text'
              name='tms_profile'
              value={device.tms_profile} // Assuming tms_profile is a property of Device, if not, it should be removed or corrected
              disabled
              className='w-full p-2 border border-gray-300 rounded-md bg-gray-200'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <div>
            <label>TID</label>
            <input
              type='text'
              name='tid'
              value={updatedDevice.tid}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>Serial Number</label>
            <input
              type='text'
              name='serial_number'
              value={updatedDevice.serial_number}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>SIM</label>
            <input
              type='text'
              name='sim'
              value={updatedDevice.sim || ''}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>Status</label>
            <select
              name='status'
              value={updatedDevice.status}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            >
              <option value='AVAILABLE'>Available</option>
              <option value='PROVISIONED'>Provisioned</option>
              <option value='FAULTY'>Faulty</option>
              <option value='REASSIGNED'>Reassigned</option>
            </select>
          </div>
        </div>
        <div className='col-span-2'>
          <h3 className='text-xl font-semibold mb-4'>Provisioning Details</h3>
          <hr className='mb-4 border-t border-gray-200' />
        </div>
        <div className='col-span-1'>
          <div>
            <label>Provisioned At</label>
            <DatePicker
              selected={
                updatedDevice.provisioned_at
                  ? new Date(updatedDevice.provisioned_at)
                  : null
              }
              onChange={(date) =>
                setUpdatedDevice((prevState) => ({
                  ...prevState,
                  provisioned_at: date
                    ? date.toISOString().split('T')[0]
                    : null,
                }))
              }
              className='w-full p-2 border border-gray-300 rounded-md'
              showTimeSelect
              timeFormat='Pp'
              timeIntervals={15}
              timeCaption='time'
              dateFormat='Pp'
            />
          </div>
          <div>
            <label>Provisioned Location</label>
            <input
              type='text'
              name='provisioned_location'
              value={updatedDevice.provisioned_location || ''}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>Provisioned By</label>
            <input
              type='text'
              name='provisioned_by'
              value={updatedDevice.provisioned_by || ''}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Handover Details</h3>
          <hr className='mb-4 border-t border-gray-200' />
          <div>
            <label>Handover To</label>
            <input
              type='text'
              name='handover_to'
              value={updatedDevice.handover_to || ''}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label>Handover Date</label>
            <DatePicker
              selected={
                updatedDevice.handover_date
                  ? new Date(updatedDevice.handover_date)
                  : null
              }
              onChange={(date) =>
                setUpdatedDevice((prevState) => ({
                  ...prevState,
                  handover_date: date ? date.toISOString().split('T')[0] : null,
                }))
              }
              className='w-full p-2 border border-gray-300 rounded-md'
              showTimeSelect
              timeFormat='Pp'
              timeIntervals={15}
              timeCaption='time'
              dateFormat='Pp'
            />
          </div>
        </div>
        <div className='col-span-2 flex justify-end space-x-4 mt-6'>
          <button
            type='button'
            onClick={handleUpdate}
            className='bg-indigo-600 text-white px-6 py-2 rounded-md'
          >
            Update
          </button>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-400 text-white px-6 py-2 rounded-md'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateDevice
