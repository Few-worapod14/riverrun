import { IResponsePaginate, RoomDto } from '@riverrun/interface'
import { ApiClient } from './api'

export const getFilterRoom = async (roomId: number): Promise<IResponsePaginate<RoomDto>> => {
  const api: IResponsePaginate<RoomDto> = await ApiClient().get(`/rooms/${roomId}`)

  return api
}

export const getAllRooms = async () => {
  const api: IResponsePaginate<RoomDto[]> = await ApiClient().get(`/rooms`)

  return api
}

export const getRoomById = async (id: number) => {
  const api: IResponsePaginate<RoomDto> = await ApiClient().get(`/rooms/${id}`)

  return api
}
