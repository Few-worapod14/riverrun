import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class PaymentCreateDto {
  @IsString()
  no: string

  @IsNumber()
  bank: number

  @IsNumber()
  branch: string

  @IsNumber()
  name: string

  @IsBoolean()
  isPromtpay: boolean
}
