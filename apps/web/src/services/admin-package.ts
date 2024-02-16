import {
  IResponseData,
  IResponsePaginate,
  PackageCreateDto,
  PackageDto,
  PackageUpdateDto
} from '@riverrun/interface'
import queryString from 'query-string'
import { ApiAdmin } from './api'

export const getAll = async (
  currentPage: number,
  limit?: number
): Promise<IResponsePaginate<PackageDto[]>> => {
  const params = {
    page: currentPage,
    limit: limit
  }

  const query = queryString.stringify(params, {
    skipNull: true
  })

  const api: IResponsePaginate<PackageDto[]> = await ApiAdmin().get(`/admins/packages?${query}`)

  return api
}

export const create = async (data: PackageCreateDto): Promise<IResponseData<PackageDto>> => {
  const api: IResponseData<PackageDto> = await ApiAdmin().post(`/admins/packages`, data)

  return api
}

export const getById = async (id: number): Promise<IResponseData<PackageDto>> => {
  const api: IResponseData<PackageDto> = await ApiAdmin().get(`/admins/packages/${id}`)

  return api
}

export const update = async (
  id: number,
  data: PackageUpdateDto
): Promise<IResponseData<PackageDto>> => {
  const api: IResponseData<PackageDto> = await ApiAdmin().put(`/admins/packages/${id}`, data)

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponseData<string> = await ApiAdmin().delete(`/admins/packages/${id}`)

  return api
}
