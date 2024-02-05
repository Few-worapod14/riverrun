import { PartialType } from '@nestjs/mapped-types'
import { RoomCategoryCreateDto } from './create'

export class RoomCategoryUpdateDto extends PartialType(RoomCategoryCreateDto) {}
