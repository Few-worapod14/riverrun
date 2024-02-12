import { PartialType } from '@nestjs/mapped-types'
import { BookingCreateDto } from './create'

export class BookingUpdateDto extends PartialType(BookingCreateDto) {}
