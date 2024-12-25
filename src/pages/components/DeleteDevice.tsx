// // src/components/DeleteDevice.tsx
// 'use client'
// import '../../app/globals.css'
// import React from 'react'
// import axios from 'axios'

// interface DeleteDeviceProps {
//   deviceId: string
//   onDelete: () => void
//   onClose: () => void
// }

// const DeleteDevice: React.FC<DeleteDeviceProps> = ({
//   deviceId,
//   onDelete,
//   onClose,
// }) => {
//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/devices/${deviceId}`)
//       onDelete()
//       alert('Device deleted successfully')
//     } catch (error) {
//       console.error('Error deleting device:', error)
//       alert('Failed to delete device')
//     }
//   }

//   return (
//     <div className='bg-white p-8 rounded-lg shadow-lg'>
//       <h2 className='text-2xl font-semibold mb-6 text-center'>Delete Device</h2>
//       <p>Are you sure you want to delete this device?</p>
//       <div className='flex justify-end space-x-4 mt-6'>
//         <button
//           onClick={onClose}
//           className='bg-gray-400 text-white px-6 py-2 rounded-md'
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleDelete}
//           className='bg-red-600 text-white px-6 py-2 rounded-md'
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   )
// }

// export default DeleteDevice
