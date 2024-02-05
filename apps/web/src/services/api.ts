import { ErrorDto } from '@riverrun/interface'
import axios, { AxiosError } from 'axios'
import { localStorageName } from '../store/store'
export const baseApi = import.meta.env.VITE_APP_API

export const ApiClient = () => {
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
    const token = parse?.state?.user?.accessToken
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401 || error.response?.status === undefined) {
        window.location.href = '/login'
        return
      }
      const res = error.response?.data as ErrorDto
      console.log(`error`, res)
      return res
    }
  )

  return instance
}

export const ApiAdmin = () => {
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
    const token = parse?.state?.admin?.accessToken
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error: AxiosError) => {
      if (error.response?.status === 401 || error.response?.status === undefined) {
        window.location.href = '/admin/login'
        return
      }
      const res = error.response?.data as ErrorDto
      console.log(`error`, res)
      return res
    }
  )

  return instance
}
