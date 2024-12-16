// // src/pages/devices/BulkUploadPage.tsx

// 'use client'

// import React, { useState } from 'react'
// import axios from 'axios'
// import * as XLSX from 'xlsx'

// const BulkUploadPage = () => {
//   const [file, setFile] = useState<File | null>(null)
//   const [loading, setLoading] = useState(false)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0])
//     }
//   }

//   const handleUpload = async () => {
//     if (!file) return alert('Please select a file')

//     const reader = new FileReader()
//     reader.onload = async (e) => {
//       const binaryStr = e.target?.result
//       const workbook = XLSX.read(binaryStr, { type: 'binary' })
//       const sheet = workbook.Sheets[workbook.SheetNames[0]]
//       const data = XLSX.utils.sheet_to_json(sheet)

//       try {
//         setLoading(true)
//         await axios.post('/api/devices/bulk', { devices: data })
//         alert('Devices uploaded successfully')
//       } catch (error) {
//         console.error('Error uploading devices:', error)
//         alert('Failed to upload devices')
//       } finally {
//         setLoading(false)
//       }
//     }

//     reader.readAsBinaryString(file)
//   }

//   return (
//     <div className='max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'>
//       <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
//         Bulk Upload Devices
//       </h1>
//       <input
//         type='file'
//         accept='.xlsx, .xls'
//         onChange={handleFileChange}
//         className='p-2 mb-4 border border-gray-300 rounded-md'
//       />
//       <button
//         onClick={handleUpload}
//         className='bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300'
//         disabled={loading}
//       >
//         {loading ? 'Uploading...' : 'Upload File'}
//       </button>
//     </div>
//   )
// }

// export default BulkUploadPage
