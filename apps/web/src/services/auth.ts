import { ResponseData } from '@riverrun/interface'
import { UserDTO } from '../store/store'
import ApiClient from './api'

export const login = async (email: string, password: string): Promise<ResponseData<UserDTO>> => {
  const api: ResponseData<UserDTO> = await ApiClient.post('/auth', {
    email,
    password
  })

  return api
}
