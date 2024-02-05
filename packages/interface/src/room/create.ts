import { IsNumber, IsOptional, IsString } from 'class-validator'

export class RoomCreateDto {
  @IsNumber()
  categoryId: number

  @IsString()
  name: string

  @IsNumber()
  pricePerNight: number

  @IsOptional()
  detail?: string
}
