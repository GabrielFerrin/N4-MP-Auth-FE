import axios from 'axios'

const verifyToken = async () => {
  const token = localStorage.getItem('token')
  if (token)
    try {
      const dataApi = axios.create({ baseURL: import.meta.env.VITE_API_KEY })
      const response = await dataApi.post('verify-token', null,
        { headers: { Authorization: token } })
      return response.data
    } catch (error) {
      return error.response.data
    }
}

export default verifyToken