import { IsEmail, IsString } from 'class-validator'

export class ContactCreateDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  tel: string

  @IsString()
  title: string

  @IsString()
  message: string
}
