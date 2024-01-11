import axios from 'axios'
import { localStorageName } from '../store/store'
export const baseApi = import.meta.env.VITE_APP_API

const ApiClient = () => {
  const instance = axios.create({
    baseURL: baseApi,
    timeout: 40000,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })

  instance.interceptors.request.use(async (request) => {
    const storage = localStorage.getItem(localStorageName)
    const parse = JSON.parse(storage!)
    const token = parse?.state?.token
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(`error`, error)
      return error
    }
  )

  return instance
}

export default ApiClient()
