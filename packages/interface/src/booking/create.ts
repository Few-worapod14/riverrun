import { IsDateString, IsInt } from 'class-validator'

export class BookingCreateDto {
  @IsDateString()
  startBookingDate: Date

  @IsDateString()
  endBookingDate: Date

  @IsInt()
  roomId: number

  @IsInt()
  adult: number

  @IsInt()
  children: number

  @IsInt()
  discount: number
}
