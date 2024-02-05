import {
  IResponseData,
  IResponsePaginate,
  RoomCategoryCreateDto,
  RoomCategoryDto,
  RoomCategoryUpdateDto
} from '@riverrun/interface'
import { ApiAdmin } from './api'

export const getAll = async (
  currentPage: number
): Promise<IResponsePaginate<RoomCategoryDto[]>> => {
  const api: IResponsePaginate<RoomCategoryDto[]> = await ApiAdmin().get(
    `/admins/rooms/categories?page=${currentPage}`
  )

  return api
}

export const create = async (data: RoomCategoryCreateDto) => {
  const api: IResponseData<string> = await ApiAdmin().post(`/admins/rooms/categories`, data)

  return api
}

export const getById = async (id: number) => {
  const api: IResponseData<RoomCategoryDto> = await ApiAdmin().get(`/admins/rooms/categories/${id}`)

  return api
}

export const update = async (id: number, data: RoomCategoryUpdateDto) => {
  const api: IResponseData<RoomCategoryDto> = await ApiAdmin().put(
    `/admins/rooms/categories/${id}`,
    data
  )

  return api
}

export const remove = async (id: number) => {
  const api: IResponseData<string> = await ApiAdmin().get(`/admins/rooms/categories/${id}`)

  return api
}
