import { IsNumber, IsString } from 'class-validator'

export class RoomCreateDto {
  @IsString()
  name: string

  @IsNumber()
  price: number

  detail?: string
}
