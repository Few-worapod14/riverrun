import { IsBoolean, IsString } from 'class-validator'

export class RoomCategoryCreateDto {
  @IsString()
  name: string

  @IsBoolean()
  isActive: boolean
}
