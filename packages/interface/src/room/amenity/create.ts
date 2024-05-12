import { IsString } from 'class-validator'

export class AmenityCreateDto {
  AmenityCreateListDto
  name: string
  lists: AmenityCreateListDto[]
}

export class AmenityCreateListDto {
  @IsString()
  name: string
}
