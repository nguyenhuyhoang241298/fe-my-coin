import axiosClient from '@/lib/axios/axiosClient'
import { PresignedUrlResponse } from './type'

export const getPresignedPutUrl = async (
  filename: string,
): Promise<PresignedUrlResponse> => {
  const res = await axiosClient.get('/api/v1/minio/presignedPutUrl', {
    params: {
      bucketName: 'my-coin',
      objectName: filename,
    },
  })

  return res.data
}
