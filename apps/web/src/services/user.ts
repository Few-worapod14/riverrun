import { CustomerCreateDto, IResponseData } from '@riverrun/interface'
import { UserDTO } from '../store/store'
import { ApiClient } from './api'

export const create = async (data: CustomerCreateDto): Promise<IResponseData<UserDTO>> => {
  const api: IResponseData<UserDTO> = await ApiClient().post('/users', {
    data
  })

  return api
}
