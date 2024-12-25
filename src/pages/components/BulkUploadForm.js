// components/BulkUploadForm.js
import { useState } from 'react'

const BulkUploadForm = () => {
  const [loading, setLoading] = useState(false)

  const bulkUpload = async () => {
    const devices = [
      { id: 1, name: 'Device A' },
      { id: 2, name: 'Device B' },
      { id: 3, name: 'Device C' },
    ]

    setLoading(true)

    try {
      const response = await fetch('/api/devices/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(devices),
      })

      if (!response.ok) {
        const data = await response.json()
        console.error('Error uploading devices:', data.message)
        alert('Failed to upload devices.')
      } else {
        const data = await response.json()
        console.log('Devices uploaded successfully:', data)
        alert('Devices uploaded successfully!')
      }
    } catch (error) {
      console.error('Request failed', error)
      alert('An error occurred during the request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Bulk Upload Form</h2>
      <button onClick={bulkUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Devices'}
      </button>
    </div>
  )
}

export default BulkUploadForm
