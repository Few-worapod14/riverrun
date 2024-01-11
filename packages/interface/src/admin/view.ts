import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AdminDto {
  id: number

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string
}
