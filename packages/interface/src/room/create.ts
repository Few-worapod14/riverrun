import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class RoomCreateDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId: number

  @IsString()
  name: string

  @IsNumber()
  @Transform(({ value }) => Number(value))
  pricePerNight: number

  @IsNumber()
  @Transform(({ value }) => Number(value))
  amount: number

  @IsOptional()
  detail?: string

  @IsString()
  isActive: string
}
