import { PartialType } from '@nestjs/mapped-types'
import { PackageCreateDto } from './create'

export class PackageUpdateDto extends PartialType(PackageCreateDto) {}
