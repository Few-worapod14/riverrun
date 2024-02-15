import { IResponsePaginate, RoomDto } from '@riverrun/interface'
import queryString from 'query-string'
import { ApiClient } from './api'

export const search = async (
  startBooking: string,
  endBooking: string,
  roomBooking: number
): Promise<IResponsePaginate<RoomDto[]>> => {
  const params = {
    startBooking: startBooking,
    endBooking: endBooking,
    roomBooking: roomBooking
  }

  const query = queryString.stringify(params, {
    skipNull: true
  })

  const api: IResponsePaginate<RoomDto[]> = await ApiClient().get(`/bookings/search?${query}`)

  return api
}
