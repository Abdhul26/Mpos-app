// // pages/devices/AddDevicePage.tsx
// 'use client'

// import React, { useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router'

// const AddDevicePage = () => {
//   const router = useRouter()
//   const [tid, setTid] = useState('')
//   const [serialNumber, setSerialNumber] = useState('')
//   const [status, setStatus] = useState('')
//   const [merchantEmirate, setMerchantEmirate] = useState('')
//   const [simInfo, setSimInfo] = useState('')
//   const [merchantId, setMerchantId] = useState('')
//   const [tmsProfile, setTmsProfile] = useState('')
//   const [provisioningDate, setProvisioningDate] = useState('')
//   const [provisionedLocation, setProvisionedLocation] = useState('')
//   const [provisionedBy, setProvisionedBy] = useState('')
//   const [handoverTo, setHandoverTo] = useState('')
//   const [handoverDate, setHandoverDate] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const deviceData = {
//       tid,
//       serial_number: serialNumber,
//       sim_info: simInfo,
//       merchant_id: merchantId,
//       merchant_emirate: merchantEmirate,
//       tms_profile: tmsProfile,
//       status,
//       provisioning_date: provisioningDate,
//       provisioned_kir_location: provisionedLocation,
//       provisioned_by: provisionedBy,
//       handover_to: handoverTo,
//       handover_date: handoverDate,
//     }

//     setLoading(true)
//     try {
//       await axios.post('/api/devices', deviceData)
//       alert('Device added successfully')
//       router.push('/devices') // Redirect to devices list after successful add
//     } catch (error) {
//       console.error('Error adding device:', error)
//       alert('Failed to add device')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = () => {
//     router.push('/devices') // Return to devices list on cancel
//   }

//   return (
//     <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
//       <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
//         Add New Device
//       </h1>
//       <form onSubmit={handleSubmit}>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//           {/* Device Information */}
//           <div className='space-y-4'>
//             <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
//               Device Information
//             </h2>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 TID
//               </label>
//               <input
//                 type='text'
//                 id='tid'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={tid}
//                 onChange={(e) => setTid(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Serial Number
//               </label>
//               <input
//                 type='text'
//                 id='serialNumber'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={serialNumber}
//                 onChange={(e) => setSerialNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 SIM Information
//               </label>
//               <input
//                 type='text'
//                 id='simInfo'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={simInfo}
//                 onChange={(e) => setSimInfo(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Status
//               </label>
//               <select
//                 id='status'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 required
//               >
//                 <option value=''>Select Status</option>
//                 <option value='Available'>Available</option>
//                 <option value='In Use'>In Use</option>
//                 <option value='Maintenance'>Maintenance</option>
//                 <option value='Decommissioned'>Decommissioned</option>
//               </select>
//             </div>
//           </div>

//           {/* Merchant Information */}
//           <div className='space-y-4'>
//             <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
//               Merchant Information
//             </h2>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Merchant ID
//               </label>
//               <input
//                 type='text'
//                 id='merchantId'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={merchantId}
//                 onChange={(e) => setMerchantId(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Merchant Emirate
//               </label>
//               <select
//                 id='merchantEmirate'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={merchantEmirate}
//                 onChange={(e) => setMerchantEmirate(e.target.value)}
//                 required
//               >
//                 <option value=''>Select Emirate</option>
//                 <option value='Abu Dhabi'>Abu Dhabi</option>
//                 <option value='Dubai'>Dubai</option>
//                 <option value='Sharjah'>Sharjah</option>
//                 <option value='Ajman'>Ajman</option>
//                 <option value='Umm Al Quwain'>Umm Al Quwain</option>
//                 <option value='Ras Al Khaimah'>Ras Al Khaimah</option>
//                 <option value='Fujairah'>Fujairah</option>
//               </select>
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 TMS Profile
//               </label>
//               <input
//                 type='text'
//                 id='tmsProfile'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={tmsProfile}
//                 onChange={(e) => setTmsProfile(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Provisioning Information */}
//           <div className='space-y-4'>
//             <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
//               Provisioning Details
//             </h2>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Provisioning Date
//               </label>
//               <input
//                 type='date'
//                 id='provisioningDate'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={provisioningDate}
//                 onChange={(e) => setProvisioningDate(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Provisioned Location
//               </label>
//               <input
//                 type='text'
//                 id='provisionedLocation'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={provisionedLocation}
//                 onChange={(e) => setProvisionedLocation(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Provisioned By
//               </label>
//               <input
//                 type='text'
//                 id='provisionedBy'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={provisionedBy}
//                 onChange={(e) => setProvisionedBy(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Handover To
//               </label>
//               <input
//                 type='text'
//                 id='handoverTo'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={handoverTo}
//                 onChange={(e) => setHandoverTo(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-semibold text-gray-700 mb-2'>
//                 Handover Date
//               </label>
//               <input
//                 type='date'
//                 id='handoverDate'
//                 className='w-full p-3 border border-gray-300 rounded-md'
//                 value={handoverDate}
//                 onChange={(e) => setHandoverDate(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className='flex justify-center gap-4 mt-8'>
//           <button
//             type='button'
//             onClick={handleCancel}
//             className='bg-gray-500 text-white px-8 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300 w-1/4'
//           >
//             Cancel
//           </button>
//           <button
//             type='submit'
//             className='bg-indigo-600 text-white px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300 w-1/4'
//             disabled={loading}
//           >
//             {loading ? 'Adding...' : 'Add Device'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default AddDevicePage
