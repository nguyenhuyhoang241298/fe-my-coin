'use client'

import AwsS3 from '@uppy/aws-s3'
import Uppy from '@uppy/core'
import '@uppy/core/css/style.min.css'
import '@uppy/dashboard/css/style.min.css'
import Dashboard from '@uppy/react/dashboard'
import { useMemo } from 'react'
import { getPresignedPutUrl } from './api'

export default function Uploader() {
  const uppy = useMemo(() => {
    const u = new Uppy({
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: 10,
        maxFileSize: 50 * 1024 * 1024, // 50MB
        allowedFileTypes: ['image/*', 'application/pdf'],
      },
    })

    u.use(AwsS3, {
      shouldUseMultipart: false,
      async getUploadParameters(file) {
        const res = await getPresignedPutUrl(file.name)

        if (!res.presignedUrl) throw new Error('Failed to get presigned URL')

        return {
          method: 'PUT',
          url: res.presignedUrl,
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
          },
        }
      },
    })

    return u
  }, [])

  return <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />
}
