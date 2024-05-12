import { BookingSlotViewDto } from '../booking-slot'
import { CustomerDto } from '../customer'
import { RoomDto } from '../room'

export class BookingDto {
  id: number

  startBookingDate: Date

  endBookingDate: Date

  checkInDate?: Date | null

  checkOutDate?: Date | null

  room: RoomDto

  customer: CustomerDto

  name?: string | null

  email?: string | null

  mobile?: string | null

  roomAmount: number

  adult: number

  children: number

  days: number

  discount: number

  total: number

  totalAmount: number

  note?: string

  status: string

  slot: BookingSlotViewDto

  createdAt: Date

  updatedAt: Date
}
