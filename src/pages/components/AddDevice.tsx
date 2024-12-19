// src/components/AddDevice.tsx
'use client'
import '../../app/globals.css'

import React, { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface FormData {
  tid: string
  serial_number: string
  sim: string
  status: 'AVAILABLE' | 'PROVISIONED' | 'FAULTY' | 'REASSIGNED'
  provisioned_at: Date
  provisioned_location: string
  provisioned_by: string
  merchant_id: string
  merchant_name: string
  merchant_emirate: string
  tms_profile: string
  handover_to: string
  handover_date: Date
  replacement_type: 'GREEN_FIELD' | 'REPLACEMENT'
}

interface AddDeviceProps {
  setDevices: React.Dispatch<React.SetStateAction<any[]>>
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddDevice: React.FC<AddDeviceProps> = ({
  setDevices,
  setShowAddForm,
}) => {
  const [formData, setFormData] = useState<FormData>({
    tid: '',
    serial_number: '',
    sim: '',
    status: 'AVAILABLE',
    provisioned_at: new Date(),
    provisioned_location: '',
    provisioned_by: '',
    merchant_id: '',
    merchant_name: '',
    merchant_emirate: '',
    tms_profile: '',
    handover_to: '',
    handover_date: new Date(),
    replacement_type: 'GREEN_FIELD',
  })

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleProvisionedDateChange = (date: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      provisioned_at: date,
    }))
  }

  const handleHandoverDateChange = (date: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      handover_date: date,
    }))
  }

  const handleAddDevice = async () => {
    try {
      const response = await axios.post('/api/devices', formData)
      setDevices((prevDevices) => [...prevDevices, response.data.device])
      setShowAddForm(false)
      alert('Device added successfully')
    } catch (error) {
      console.error('Error adding device:', error)
      alert('Failed to add device')
    }
  }

  return (
    <div
      className='bg-white p-8 rounded-lg shadow-lg absolute inset-0 m-auto max-w-4xl overflow-y-auto'
      style={{ maxHeight: 'fit-content' }}
    >
      <h2 className='text-2xl font-semibold mb-6 text-center'>Add Device</h2>
      <form className='grid grid-cols-2 gap-6' style={{ maxWidth: '90%' }}>
        <div className='col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Merchant Details</h3>
          <div className='p-2'>
            <label>Merchant ID</label>
            <input
              type='text'
              name='merchant_id'
              value={formData.merchant_id}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
          <div className='p-2'>
            <label>Merchant Name</label>
            <input
              type='text'
              name='merchant_name'
              value={formData.merchant_name}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
          <div className='p-2'>
            <label>Merchant Emirate</label>
            <input
              type='text'
              name='merchant_emirate'
              value={formData.merchant_emirate}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
          <div className='p-2'>
            <label>TMS Profile</label>
            <input
              type='text'
              name='tms_profile'
              value={formData.tms_profile}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Device Details</h3>
          <div className='p-2'>
            <label>TID</label>
            <input
              type='text'
              name='tid'
              value={formData.tid}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
          <div className='p-2'>
            <label>Serial Number</label>
            <input
              type='text'
              name='serial_number'
              value={formData.serial_number}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
          <div className='p-2'>
            <label>SIM</label>
            <input
              type='text'
              name='sim'
              value={formData.sim}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            />
          </div>
          <div className='p-2'>
            <label>Status</label>
            <select
              name='status'
              value={formData.status}
              onChange={handleFormChange}
              className='w-full border border-gray-300 rounded-md'
            >
              <option value='AVAILABLE'>Available</option>
              <option value='PROVISIONED'>Provisioned</option>
              <option value='FAULTY'>Faulty</option>
              <option value='REASSIGNED'>Reassigned</option>
            </select>
          </div>
        </div>
        <div className='col-span-2'>
          <hr className='my-4 border-t border-gray-200' />
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <h3 className='text-xl font-semibold mb-4'>
                Provisioning Details
              </h3>
              <div className='p-2'>
                <label>Provisioned At</label>
                <DatePicker
                  selected={formData.provisioned_at}
                  onChange={handleProvisionedDateChange}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm aa'
                  className='w-full border border-gray-300 rounded-md'
                />
              </div>
              <div className='p-2'>
                <label>Provisioned Location</label>
                <input
                  type='text'
                  name='provisioned_location'
                  value={formData.provisioned_location}
                  onChange={handleFormChange}
                  className='w-full border border-gray-300 rounded-md'
                />
              </div>
              <div className='p-2'>
                <label>Provisioned By</label>
                <input
                  type='text'
                  name='provisioned_by'
                  value={formData.provisioned_by}
                  onChange={handleFormChange}
                  className='w-full border border-gray-300 rounded-md'
                />
              </div>
              <div className='p-2'>
                <label>Replacement Type</label>
                <select
                  name='replacement_type'
                  value={formData.replacement_type}
                  onChange={handleFormChange}
                  className='w-full border border-gray-300 rounded-md'
                >
                  <option value='GREEN_FIELD'>Green Field</option>
                  <option value='REPLACEMENT'>Replacement</option>
                </select>
              </div>
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-4'>Handover Details</h3>
              <div className='p-2'>
                <label>Handover To</label>
                <input
                  type='text'
                  name='handover_to'
                  value={formData.handover_to}
                  onChange={handleFormChange}
                  className='w-full border border-gray-300 rounded-md'
                />
              </div>
              <div className='p-2'>
                <label>Handover Date</label>
                <DatePicker
                  selected={formData.handover_date}
                  onChange={handleHandoverDateChange}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm aa'
                  className='w-full border border-gray-300 rounded-md'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-2 flex justify-end space-x-4 mt-6'>
          <button
            type='button'
            onClick={() => setShowAddForm(false)}
            className='bg-gray-400 text-white px-6 py-2 rounded-md'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleAddDevice}
            className='bg-indigo-600 text-white px-8 py-2 rounded-md'
          >
            Add Device
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDevice
