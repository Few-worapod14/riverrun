import { IsBoolean, IsDate, IsInt } from 'class-validator'

export class BookingCreateDto {
  @IsDate()
  start_date: Date

  @IsDate()
  end_date: Date

  @IsInt()
  roomId: number

  @IsInt()
  userId?: number

  @IsInt()
  adult: number

  @IsInt()
  children: number

  @IsInt()
  price: number

  @IsBoolean()
  paid: boolean
}
