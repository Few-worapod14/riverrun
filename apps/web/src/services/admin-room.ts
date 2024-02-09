import {
  IResponseData,
  IResponsePaginate,
  RoomCreateDto,
  RoomDto,
  RoomUpdateDto
} from '@riverrun/interface'
import { ApiAdmin } from './api'

export const getAll = async (currentPage: number): Promise<IResponsePaginate<RoomDto[]>> => {
  const api: IResponsePaginate<RoomDto[]> = await ApiAdmin().get(
    `/admins/rooms?page=${currentPage}`
  )

  return api
}

export const create = async (data: RoomCreateDto): Promise<IResponseData<RoomDto>> => {
  const api: IResponseData<RoomDto> = await ApiAdmin().post(`/admins/rooms`, data)

  return api
}

export const getById = async (id: number): Promise<IResponseData<RoomDto>> => {
  const api: IResponsePaginate<RoomDto> = await ApiAdmin().get(`/admins/rooms/${id}`)

  return api
}

export const update = async (
  id: number,
  data: RoomUpdateDto
): Promise<IResponseData<RoomDto[]>> => {
  const api: IResponsePaginate<RoomDto[]> = await ApiAdmin().put(`/admins/rooms/${id}`, data)

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/rooms/${id}`)

  return api
}
