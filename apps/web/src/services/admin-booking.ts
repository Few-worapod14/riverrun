import {
  BookingDto,
  IResponseData,
  IResponsePaginate,
  RoomCreateDto,
  RoomUpdateDto
} from '@riverrun/interface'
import { ApiAdmin } from './api'

export const getAll = async (currentPage: number): Promise<IResponsePaginate<BookingDto[]>> => {
  const api: IResponsePaginate<BookingDto[]> = await ApiAdmin().get(
    `/admins/bookings?page=${currentPage}`
  )

  return api
}

export const create = async (data: RoomCreateDto): Promise<IResponseData<BookingDto>> => {
  const api: IResponseData<BookingDto> = await ApiAdmin().post(`/admins/bookings`, data)

  return api
}

export const getById = async (id: number): Promise<IResponseData<BookingDto>> => {
  const api: IResponsePaginate<BookingDto> = await ApiAdmin().get(`/admins/bookings/${id}`)

  return api
}

export const update = async (
  id: number,
  data: RoomUpdateDto
): Promise<IResponseData<BookingDto[]>> => {
  const api: IResponsePaginate<BookingDto[]> = await ApiAdmin().put(`/admins/bookings/${id}`, data)

  return api
}

export const remove = async (id: number): Promise<IResponseData<string>> => {
  const api: IResponsePaginate<string> = await ApiAdmin().delete(`/admins/bookings/${id}`)

  return api
}
