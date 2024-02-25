import { IResponsePaginate, PaymentDto } from '@riverrun/interface'
import queryString from 'query-string'
import { ApiClient } from './api'

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

  const api: IResponsePaginate<PaymentDto[]> = await ApiClient().get(`/payments?${query}`)

  return api
}
