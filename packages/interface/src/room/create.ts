import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class RoomCreateDto {
  @IsString()
  roomNumber: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  detail?: string

  @IsBoolean()
  isActive: boolean
}
