import { IsString } from 'class-validator'

export class PaymentCreateDto {
  @IsString()
  no: string

  @IsString()
  bank: string

  @IsString()
  branch: string

  @IsString()
  name: string
}
