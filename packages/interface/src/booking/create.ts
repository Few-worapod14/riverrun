import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class BookingCreateDto {
  @IsDateString()
  startBookingDate: Date

  @IsDateString()
  endBookingDate: Date

  @IsNumber()
  roomId: number

  @IsNumber()
  roomAmount: number

  @IsNumber()
  adult: number

  @IsNumber()
  children: number

  @IsOptional()
  @IsString()
  name?: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  mobile?: string
}
