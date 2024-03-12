import { IResponseData, IResponsePaginate, PaymentDto } from '@riverrun/interface'
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

export const create = async (data: FormData): Promise<IResponseData<PaymentDto>> => {
  const api: IResponseData<PaymentDto> = await ApiAdmin().post(`/admins/payments`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return api
}

export const getById = async (id: number): Promise<IResponseData<PaymentDto>> => {
  const api: IResponseData<PaymentDto> = await ApiAdmin().get(`/admins/payments/${id}`)

  return api
}

export const update = async (id: number, data: FormData): Promise<IResponseData<PaymentDto>> => {
  const api: IResponseData<PaymentDto> = await ApiAdmin().put(`/admins/payments/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponseData<string> = await ApiAdmin().delete(`/admins/payments/${id}`)

  return api
}

export const removeImg = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponseData<string> = await ApiAdmin().delete(`/admins/payments/${id}/image`)

  return api
}
