// 'use client'
// import '../../app/globals.css'
// import React from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router'

// interface Device {
//   tid: string
//   serial_number: string
//   sim: string
//   status: string
//   provisioned_at: Date | null
//   provisioned_location: string
//   provisioned_by: string
//   merchant_id: string
//   merchant_name: string
//   merchant_emirate: string
//   tms_profile: string
//   handover_to: string
//   handover_date: Date | null
//   replacement_type: string
// }

// interface ViewDeviceProps {
//   device: Device
//   onClose: () => void
// }

// const ViewDevice: React.FC<ViewDeviceProps> = ({ device, onClose }) => {
//   return (
//     <div
//       className='bg-white p-8 rounded-lg shadow-lg absolute inset-0 m-auto max-w-4xl overflow-y-auto'
//       style={{ maxHeight: 'fit-content' }}
//     >
//       <h2 className='text-2xl font-semibold mb-6 text-center'>View Device</h2>
//       <div className='grid grid-cols-2 gap-6' style={{ maxWidth: '90%' }}>
//         <div className='col-span-1'>
//           <h3 className='text-xl font-semibold mb-4'>Merchant Details</h3>
//           <p>
//             <strong>Merchant ID:</strong> {device.merchant_id}
//           </p>
//           <p>
//             <strong>Merchant Name:</strong> {device.merchant_name}
//           </p>
//           <p>
//             <strong>Merchant Emirate:</strong> {device.merchant_emirate}
//           </p>
//           <p>
//             <strong>TMS Profile:</strong> {device.tms_profile}
//           </p>
//         </div>
//         <div className='col-span-1'>
//           <h3 className='text-xl font-semibold mb-4'>Device Details</h3>
//           <p>
//             <strong>TID:</strong> {device.tid}
//           </p>
//           <p>
//             <strong>Serial Number:</strong> {device.serial_number}
//           </p>
//           <p>
//             <strong>SIM:</strong> {device.sim}
//           </p>
//           <p>
//             <strong>Status:</strong> {device.status}
//           </p>
//         </div>
//         <div className='col-span-2'>
//           <hr className='my-4 border-t border-gray-200' />
//           <h3 className='text-xl font-semibold mb-4'>Provisioning Details</h3>
//           <p>
//             <strong>Provisioned At:</strong>{' '}
//             {device.provisioned_at ? device.provisioned_at.toString() : 'N/A'}
//           </p>
//           <p>
//             <strong>Provisioned Location:</strong> {device.provisioned_location}
//           </p>
//           <p>
//             <strong>Provisioned By:</strong> {device.provisioned_by}
//           </p>
//           <p>
//             <strong>Replacement Type:</strong> {device.replacement_type}
//           </p>
//         </div>
//         <div className='col-span-2 flex justify-end space-x-4 mt-6'>
//           <button
//             type='button'
//             onClick={onClose}
//             className='bg-red-600 text-white px-6 py-2 rounded-md'
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ViewDevice
'use client'
import '../../app/globals.css'
import React from 'react'
import { useRouter } from 'next/router'

interface Device {
  tid: string
  serial_number: string
  sim: string
  status: string
  provisioned_at: Date | null
  provisioned_location: string
  provisioned_by: string
  merchant_id: string
  merchant_name: string
  merchant_emirate: string
  tms_profile: string
  handover_to: string
  handover_date: Date | null
  replacement_type: string
  device_model: string // Make sure device model is part of the data structure
}

interface ViewDeviceProps {
  device: Device
  onClose: () => void
}

const ViewDevice: React.FC<ViewDeviceProps> = ({ device, onClose }) => {
  return (
    <div
      className='bg-white p-8 rounded-lg shadow-lg absolute inset-0 m-auto max-w-4xl overflow-y-auto'
      style={{ maxHeight: 'fit-content' }}
    >
      <h2 className='text-2xl font-semibold mb-6 text-center'>View Device</h2>

      <div className='grid grid-cols-2 gap-6' style={{ maxWidth: '90%' }}>
        {/* Merchant Details Section */}
        <div className='col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Merchant Details</h3>
          <p>
            <strong>Merchant ID:</strong> {device.merchant_id}
          </p>
          <p>
            <strong>Merchant Name:</strong> {device.merchant_name}
          </p>
          <p>
            <strong>Merchant Emirate:</strong> {device.merchant_emirate}
          </p>
          <p>
            <strong>TMS Profile:</strong> {device.tms_profile}
          </p>
        </div>

        {/* Device Details Section */}
        <div className='col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Device Details</h3>
          <p>
            <strong>TID:</strong> {device.tid}
          </p>
          <p>
            <strong>Serial Number:</strong> {device.serial_number}
          </p>
          <p>
            <strong>SIM:</strong> {device.sim}
          </p>
          <p>
            <strong>Status:</strong> {device.status}
          </p>
        </div>

        {/* New Device Model Section */}
        <div className='col-span-1'>
          <h3 className='text-xl font-semibold mb-4'>Device Model</h3>
          <p>
            <strong>Device Model:</strong> {device.device_model}
          </p>
        </div>

        {/* Provisioning Details Section */}
        <div className='col-span-2'>
          <hr className='my-4 border-t border-gray-200' />
          <h3 className='text-xl font-semibold mb-4'>Provisioning Details</h3>
          <p>
            <strong>Provisioned At:</strong>{' '}
            {device.provisioned_at ? device.provisioned_at.toString() : 'N/A'}
          </p>
          <p>
            <strong>Provisioned Location:</strong> {device.provisioned_location}
          </p>
          <p>
            <strong>Provisioned By:</strong> {device.provisioned_by}
          </p>
          <p>
            <strong>Replacement Type:</strong> {device.replacement_type}
          </p>
        </div>

        {/* Close Button */}
        <div className='col-span-2 flex justify-end space-x-4 mt-6'>
          <button
            type='button'
            onClick={onClose}
            className='bg-red-600 text-white px-6 py-2 rounded-md'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewDevice
