import { AmenityDto } from './amenity'
import { RoomCategoryDto } from './category'
import { RoomImageDto } from './image'

export class RoomDto {
  id: number

  category: RoomCategoryDto

  name: string

  pricePerNight: number

  amount: number

  detail?: string

  isActive: boolean | string

  createdAt: Date

  updatedAt: Date

  images: RoomImageDto[]

  amenities: AmenityDto[]
}
