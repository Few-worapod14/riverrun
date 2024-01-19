import { IsBoolean, IsString } from 'class-validator'

export class RoomCategoryUpdateDto {
  @IsString()
  name: string

  @IsBoolean()
  isActive: boolean
}
