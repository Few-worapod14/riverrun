import { RoomDto } from '../room'
import { UserDto } from '../user'

export class BookingDto {
  id: number

  start_date: Date

  end_date: Date

  room: RoomDto

  user?: UserDto

  adult: number

  children: number

  price: number

  paid: boolean

  createdAt: Date

  updatedAt: Date
}
