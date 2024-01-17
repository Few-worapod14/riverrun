import { IsDateString, IsInt } from 'class-validator'

export class BookingCreateDto {
  @IsDateString()
  startDate: Date

  @IsDateString()
  endDate: Date

  @IsInt()
  roomId: number

  @IsInt()
  adult: number

  @IsInt()
  children: number

  @IsInt()
  price: number
}
