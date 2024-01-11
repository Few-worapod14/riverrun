import { ResponseData } from '@riverrun/interface'
import { UserCreateDto } from '@riverrun/interface/src/user'
import { UserDTO } from '../store/store'
import ApiClient from './api'

export const create = async (data: UserCreateDto): Promise<ResponseData<UserDTO>> => {
  const api: ResponseData<UserDTO> = await ApiClient.post('/users', {
    data
  })

  return api
}
