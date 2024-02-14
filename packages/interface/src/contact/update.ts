import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean } from 'class-validator'
import { ContactCreateDto } from './create'

export class ContactUpdateDto extends PartialType(ContactCreateDto) {
  @IsBoolean()
  resolve: boolean
}
