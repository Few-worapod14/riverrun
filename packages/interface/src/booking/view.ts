import { CustomerDto } from '../customer'
import { RoomDto } from '../room'

export class BookingDto {
  id: number

  startBookingDate: Date

  endBookingDate: Date

  checkInDate?: Date

  checkOutDate?: Date

  room: RoomDto

  customer: CustomerDto

  adult: number

  children: number

  discount: number

  total: number

  totalAmount: number

  note?: string

  status: string

  createdAt: Date

  updatedAt: Date
}
