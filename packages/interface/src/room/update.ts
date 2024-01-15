import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class RoomUpdateDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  price?: number

  @IsOptional()
  detail?: string

  @IsOptional()
  isActive?: boolean
}
