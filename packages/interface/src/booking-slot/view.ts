import { BookingDto } from '../booking/view'
import { RoomDto } from '../room'

export class BookingSlotViewDto {
  id: number

  booking: BookingDto

  room: RoomDto

  roomAmount: number

  startBookingDate: Date

  endBookingDate: Date

  createdAt: Date

  updatedAt: Date
}
