import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class BookingCreateDto {
  @IsDateString()
  startBookingDate: string

  @IsDateString()
  endBookingDate: string

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

  @IsOptional()
  @IsString()
  note?: string
}
