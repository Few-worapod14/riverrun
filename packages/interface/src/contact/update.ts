import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'

export class ContactUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  tel?: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  message?: string

  @IsBoolean()
  @IsOptional()
  resolve?: boolean
}
