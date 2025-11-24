export const registerUser = async (data: {
  email: string
  password: string
  fullname: string
  phoneNumber: string
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data })
    }, 1000)
  })
}
