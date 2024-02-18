import {
  IResponseData,
  IResponsePaginate,
  PaymentDto,
  RoomCategoryCreateDto,
  RoomCategoryUpdateDto
} from '@riverrun/interface'
import queryString from 'query-string'
import { ApiAdmin } from './api'

export const getAll = async (
  currentPage: number,
  limit?: number
): Promise<IResponsePaginate<PaymentDto[]>> => {
  const params = {
    page: currentPage,
    limit: limit
  }

  const query = queryString.stringify(params, {
    skipNull: true
  })

  const api: IResponsePaginate<PaymentDto[]> = await ApiAdmin().get(`/admins/payments?${query}`)

  return api
}

export const create = async (data: RoomCategoryCreateDto): Promise<IResponseData<PaymentDto>> => {
  const api: IResponseData<PaymentDto> = await ApiAdmin().post(`/admins/payments`, data)

  return api
}

export const getById = async (id: number): Promise<IResponseData<PaymentDto>> => {
  const api: IResponseData<PaymentDto> = await ApiAdmin().get(`/admins/payments/${id}`)

  return api
}

export const update = async (
  id: number,
  data: RoomCategoryUpdateDto
): Promise<IResponseData<PaymentDto>> => {
  const api: IResponseData<PaymentDto> = await ApiAdmin().put(`/admins/payments/${id}`, data)

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponseData<string> = await ApiAdmin().delete(`/admins/payments/${id}`)

  return api
}
