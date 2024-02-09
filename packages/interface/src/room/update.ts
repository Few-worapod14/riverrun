import { PartialType } from '@nestjs/mapped-types'
import { RoomCreateDto } from './create'

export class RoomUpdateDto extends PartialType(RoomCreateDto) {}
