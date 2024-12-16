// src/components/DeviceForm.tsx

import React from 'react'

const DeviceForm = ({
  formData,
  handleFormChange,
  handleCloseForm,
  handleSubmit,
  editDevice,
}: {
  formData: any
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCloseForm: () => void
  handleSubmit: () => void
  editDevice: any
}) => (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
    <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
      <h2 className='text-2xl font-bold mb-6'>
        {editDevice ? 'Edit Device' : 'Add Device'}
      </h2>
      <div className='mb-4'>
        <label
          htmlFor='tid'
          className='block text-sm font-medium text-gray-700'
        >
          TID
        </label>
        <input
          type='text'
          id='tid'
          name='tid'
          value={formData.tid}
          onChange={handleFormChange}
          className='w-full p-2 border border-gray-300 rounded-md'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='serial_number'
          className='block text-sm font-medium text-gray-700'
        >
          Serial Number
        </label>
        <input
          type='text'
          id='serial_number'
          name='serial_number'
          value={formData.serial_number}
          onChange={handleFormChange}
          className='w-full p-2 border border-gray-300 rounded-md'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='status'
          className='block text-sm font-medium text-gray-700'
        >
          Status
        </label>
        <select
          id='status'
          name='status'
          value={formData.status}
          onChange={handleFormChange}
          className='w-full p-2 border border-gray-300 rounded-md'
        >
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='merchant_emirate'
          className='block text-sm font-medium text-gray-700'
        >
          Merchant Emirate
        </label>
        <input
          type='text'
          id='merchant_emirate'
          name='merchant_emirate'
          value={formData.merchant_emirate}
          onChange={handleFormChange}
          className='w-full p-2 border border-gray-300 rounded-md'
          required
        />
      </div>

      <div className='flex justify-between'>
        <button
          onClick={handleCloseForm}
          className='bg-gray-300 text-gray-800 px-4 py-2 rounded-md'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className='bg-indigo-600 text-white px-6 py-2 rounded-md'
        >
          {editDevice ? 'Save Changes' : 'Add Device'}
        </button>
      </div>
    </div>
  </div>
)

export default DeviceForm
