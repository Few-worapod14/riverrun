import { IResponseData } from '@riverrun/interface'
import { AdminDTO, UserDTO } from '../store/store'
import { ApiAdmin } from './api'

export const login = async (email: string, password: string): Promise<IResponseData<UserDTO>> => {
  const api: IResponseData<UserDTO> = await ApiAdmin().post('/auth/users', {
    email,
    password
  })

  return api
}

export const adminLogin = async (
  email: string,
  password: string
): Promise<IResponseData<AdminDTO>> => {
  const api: IResponseData<AdminDTO> = await ApiAdmin().post('/auth/admins', {
    email,
    password
  })

  return api
}
