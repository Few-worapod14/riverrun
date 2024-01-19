import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class RoomCreateDto {
  @IsNumber()
  categoryId: number

  @IsNumber()
  amount: number

  @IsNumber()
  price: number

  @IsOptional()
  detail?: string

  @IsBoolean()
  isActive: boolean
}
