import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PackageCreateDto {
  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsOptional()
  detail?: string
}
