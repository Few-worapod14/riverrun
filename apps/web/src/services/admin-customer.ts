import {
  CustomerCreateDto,
  CustomerDto,
  CustomerUpdateDto,
  IResponseData,
  IResponsePaginate
} from '@riverrun/interface'
import queryString from 'query-string'
import { ApiAdmin } from './api'

export const getAll = async (
  currentPage: number,
  keyword?: string
): Promise<IResponsePaginate<CustomerDto[]>> => {
  const params = {
    page: currentPage,
    keyword: keyword
  }
  const query = queryString.stringify(params, {
    skipNull: true
  })

  const api: IResponsePaginate<CustomerDto[]> = await ApiAdmin().get(`/admins/customers?${query}`)

  return api
}

export const create = async (data: CustomerCreateDto): Promise<IResponseData<CustomerDto>> => {
  const api: IResponseData<CustomerDto> = await ApiAdmin().post(`/admins/customers`, data)

  return api
}

export const getById = async (id: number): Promise<IResponseData<CustomerDto>> => {
  const api: IResponsePaginate<CustomerDto> = await ApiAdmin().get(`/admins/customers/${id}`)

  return api
}

export const update = async (
  id: number,
  data: CustomerUpdateDto
): Promise<IResponseData<CustomerDto[]>> => {
  const api: IResponsePaginate<CustomerDto[]> = await ApiAdmin().put(
    `/admins/customers/${id}`,
    data
  )

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/customers/${id}`)

  return api
}
