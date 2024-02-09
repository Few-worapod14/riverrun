import { RoomCategoryDto } from './category'

export class RoomDto {
  id: number

  category: RoomCategoryDto

  name: string

  pricePerNight: number

  detail?: string | undefined

  isActive: boolean | string

  createdAt: Date

  updatedAt: Date
}
