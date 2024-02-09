import {
  IResponseData,
  IResponsePaginate,
  RoomCategoryCreateDto,
  RoomCategoryDto,
  RoomCategoryUpdateDto
} from '@riverrun/interface'
import queryString from 'query-string'
import { ApiAdmin } from './api'

export const getAll = async (
  currentPage: number,
  limit?: number
): Promise<IResponsePaginate<RoomCategoryDto[]>> => {
  const params = {
    page: currentPage,
    limit: limit
  }

  const query = queryString.stringify(params, {
    skipNull: true
  })

  const api: IResponsePaginate<RoomCategoryDto[]> = await ApiAdmin().get(
    `/admins/rooms/categories?${query}`
  )

  return api
}

export const create = async (
  data: RoomCategoryCreateDto
): Promise<IResponseData<RoomCategoryDto>> => {
  const api: IResponseData<RoomCategoryDto> = await ApiAdmin().post(
    `/admins/rooms/categories`,
    data
  )

  return api
}

export const getById = async (id: number): Promise<IResponseData<RoomCategoryDto>> => {
  const api: IResponseData<RoomCategoryDto> = await ApiAdmin().get(`/admins/rooms/categories/${id}`)

  return api
}

export const update = async (
  id: number,
  data: RoomCategoryUpdateDto
): Promise<IResponseData<RoomCategoryDto>> => {
  const api: IResponseData<RoomCategoryDto> = await ApiAdmin().put(
    `/admins/rooms/categories/${id}`,
    data
  )

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponseData<string> = await ApiAdmin().delete(`/admins/rooms/categories/${id}`)

  return api
}
