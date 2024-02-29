import { RoomCategoryDto } from './category'
import { RoomImageDto } from './image'

export class RoomDto {
  id: number

  category: RoomCategoryDto

  name: string

  slug: string

  pricePerNight: number

  amount: number

  detail?: string | undefined

  isActive: boolean | string

  createdAt: Date

  updatedAt: Date

  images: RoomImageDto[]
}
