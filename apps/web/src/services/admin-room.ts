import { IResponsePaginate, RoomDto } from '@riverrun/interface'
import { ApiAdmin } from './api'

export const getAll = async (currentPage: number): Promise<IResponsePaginate<RoomDto[]>> => {
  const api: IResponsePaginate<RoomDto[]> = await ApiAdmin().get(
    `/admins/rooms?page=${currentPage}`
  )

  return api
}
