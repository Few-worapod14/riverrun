export class PaymentDto {
  id: number

  no: string

  bank: string

  branch: string

  name: string

  path?: string | null

  fullPath?: string | null
}
