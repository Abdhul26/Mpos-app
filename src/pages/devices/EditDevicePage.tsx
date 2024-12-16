// // pages/devices/EditDevicePage.tsx
// 'use client'

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router'

// const EditDevicePage = ({ params }: any) => {
//   const { id } = params
//   const router = useRouter()

//   const [device, setDevice] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [formData, setFormData] = useState({
//     tid: '',
//     serial_number: '',
//     sim_info: '',
//     merchant_id: '',
//     merchant_emirate: '',
//     tms_profile: '',
//     status: '',
//     provisioning_date: '',
//     provisioned_kir_location: '',
//     provisioned_by: '',
//     handover_to: '',
//     handover_date: '',
//   })

//   useEffect(() => {
//     const fetchDevice = async () => {
//       try {
//         const response = await axios.get(`/api/devices/${id}`)
//         setDevice(response.data)
//         setFormData({
//           tid: response.data.tid || '',
//           serial_number: response.data.serial_number || '',
//           sim_info: response.data.sim_info || '',
//           merchant_id: response.data.merchant_id || '',
//           merchant_emirate: response.data.merchant_emirate || '',
//           tms_profile: response.data.tms_profile || '',
//           status: response.data.status || '',
//           provisioning_date: response.data.provisioning_date || '',
//           provisioned_kir_location:
//             response.data.provisioned_kir_location || '',
//           provisioned_by: response.data.provisioned_by || '',
//           handover_to: response.data.handover_to || '',
//           handover_date: response.data.handover_date || '',
//         })
//       } catch (error) {
//         console.error('Error fetching device:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDevice()
//   }, [id])

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSaveChanges = async () => {
//     setLoading(true)
//     try {
//       await axios.put(`/api/devices/${id}`, formData)
//       alert('Device updated successfully')
//       router.push('/devices')
//     } catch (error) {
//       console.error('Error updating device:', error)
//       alert('Failed to update device')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) return <div>Loading...</div>

//   return (
//     <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
//       <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
//         Edit Device
//       </h1>

//       <div className='bg-white p-6 rounded-lg shadow'>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//           {/* Device Information Section */}
//           <div className='space-y-4'>
//             <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
//               Device Information
//             </h2>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 TID
//               </label>
//               <input
//                 type='text'
//                 name='tid'
//                 value={formData.tid}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Serial Number
//               </label>
//               <input
//                 type='text'
//                 name='serial_number'
//                 value={formData.serial_number}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 SIM Information
//               </label>
//               <input
//                 type='text'
//                 name='sim_info'
//                 value={formData.sim_info}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Status
//               </label>
//               <select
//                 name='status'
//                 value={formData.status}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               >
//                 <option value='available'>Available</option>
//                 <option value='provisioned'>Provisioned</option>
//                 <option value='faulty'>Faulty</option>
//               </select>
//             </div>
//           </div>

//           {/* Merchant Information Section */}
//           <div className='space-y-4'>
//             <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
//               Merchant Details
//             </h2>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Merchant ID
//               </label>
//               <input
//                 type='text'
//                 name='merchant_id'
//                 value={formData.merchant_id}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Merchant Emirate
//               </label>
//               <input
//                 type='text'
//                 name='merchant_emirate'
//                 value={formData.merchant_emirate}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 TMS Profile
//               </label>
//               <input
//                 type='text'
//                 name='tms_profile'
//                 value={formData.tms_profile}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>
//           </div>

//           {/* Provisioning Information Section */}
//           <div className='space-y-4'>
//             <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
//               Provisioning Details
//             </h2>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Provisioning Date
//               </label>
//               <input
//                 type='date'
//                 name='provisioning_date'
//                 value={formData.provisioning_date}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 KIR Location
//               </label>
//               <input
//                 type='text'
//                 name='provisioned_kir_location'
//                 value={formData.provisioned_kir_location}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Provisioned By
//               </label>
//               <input
//                 type='text'
//                 name='provisioned_by'
//                 value={formData.provisioned_by}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Handover To
//               </label>
//               <input
//                 type='text'
//                 name='handover_to'
//                 value={formData.handover_to}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>

//             <div>
//               <label className='block text-gray-700 font-medium mb-1'>
//                 Handover Date
//               </label>
//               <input
//                 type='date'
//                 name='handover_date'
//                 value={formData.handover_date}
//                 onChange={handleChange}
//                 className='w-full border border-gray-300 rounded-md p-2'
//               />
//             </div>
//           </div>
//         </div>

//         <div className='flex justify-end mt-8'>
//           <button
//             onClick={() => router.push('/devices')}
//             className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300 mr-4'
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveChanges}
//             className='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300'
//             disabled={loading}
//           >
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditDevicePage
