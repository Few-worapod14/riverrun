import { ContactDto, ContactUpdateDto, IResponseData, IResponsePaginate } from '@riverrun/interface'
import { ApiAdmin } from './api'

export const getAll = async (currentPage: number): Promise<IResponsePaginate<ContactDto[]>> => {
  const api: IResponsePaginate<ContactDto[]> = await ApiAdmin().get(
    `/admins/contacts?page=${currentPage}`
  )

  return api
}

export const getById = async (id: number): Promise<IResponseData<ContactDto>> => {
  const api: IResponsePaginate<ContactDto> = await ApiAdmin().get(`/admins/contacts/${id}`)

  return api
}

export const update = async (
  id: number,
  data: ContactUpdateDto
): Promise<IResponseData<ContactDto[]>> => {
  const api: IResponsePaginate<ContactDto[]> = await ApiAdmin().put(`/admins/contacts/${id}`, data)

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/contacts/${id}`)

  return api
}
