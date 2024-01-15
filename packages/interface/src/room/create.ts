import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class RoomCreateDto {
  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  detail?: string

  @IsBoolean()
  isActive: boolean
}
