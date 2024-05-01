import { ContactCreateDto, ContactDto, IErrorDto, IResponseData } from '@riverrun/interface'
import { ApiClient } from './api'

export const create = async (data: ContactCreateDto) => {
  const api: IResponseData<ContactDto> | IErrorDto = await ApiClient().post(`/contacts`, data)

  return api
}
