import { RoomDto } from '../view'

export class AmenityDto {
  id: number
  name: string
  room: RoomDto
  lists: AmenityListDto[]
}

export class AmenityListDto {
  id: number
  roomAmenity: AmenityDto
  name: string
}
