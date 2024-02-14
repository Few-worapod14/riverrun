import { IResponseData, IResponsePaginate, RoomDto } from '@riverrun/interface'
import { ApiAdmin } from './api'

export const getAll = async (currentPage: number): Promise<IResponsePaginate<RoomDto[]>> => {
  const api: IResponsePaginate<RoomDto[]> = await ApiAdmin().get(
    `/admins/rooms?page=${currentPage}`
  )

  return api
}

export const create = async (data: FormData): Promise<IResponseData<RoomDto>> => {
  const api: IResponseData<RoomDto> = await ApiAdmin().post(`/admins/rooms`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return api
}

export const getById = async (id: number): Promise<IResponseData<RoomDto>> => {
  const api: IResponsePaginate<RoomDto> = await ApiAdmin().get(`/admins/rooms/${id}`)

  return api
}

export const update = async (id: number, data: FormData): Promise<IResponseData<RoomDto[]>> => {
  const api: IResponsePaginate<RoomDto[]> = await ApiAdmin().put(`/admins/rooms/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/rooms/${id}`)

  return api
}

export const removeImage = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/rooms/images/${id}`)

  return api
}
