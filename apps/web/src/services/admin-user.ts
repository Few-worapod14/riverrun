import {
  AdminCreateDto,
  AdminDto,
  AdminUpdateDto,
  IResponseData,
  IResponsePaginate
} from '@riverrun/interface'
import queryString from 'query-string'
import { ApiAdmin } from './api'

export const getAll = async (
  currentPage: number,
  keyword?: string
): Promise<IResponsePaginate<AdminDto[]>> => {
  const params = {
    page: currentPage,
    keyword: keyword
  }
  const query = queryString.stringify(params, {
    skipNull: true
  })

  const api: IResponsePaginate<AdminDto[]> = await ApiAdmin().get(`/admins/users?${query}`)

  return api
}

export const create = async (data: AdminCreateDto): Promise<IResponseData<AdminDto>> => {
  const api: IResponseData<AdminDto> = await ApiAdmin().post(`/admins/users`, data)

  return api
}

export const getById = async (id: number): Promise<IResponseData<AdminDto>> => {
  const api: IResponsePaginate<AdminDto> = await ApiAdmin().get(`/admins/users/${id}`)

  return api
}

export const update = async (
  id: number,
  data: AdminUpdateDto
): Promise<IResponseData<AdminDto[]>> => {
  const api: IResponsePaginate<AdminDto[]> = await ApiAdmin().put(`/admins/users/${id}`, data)

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/users/${id}`)

  return api
}
