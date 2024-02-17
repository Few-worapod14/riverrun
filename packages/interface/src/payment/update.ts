import { PartialType } from '@nestjs/mapped-types'
import { PaymentCreateDto } from './create'

export class PaymentUpdateDto extends PartialType(PaymentCreateDto) {}
