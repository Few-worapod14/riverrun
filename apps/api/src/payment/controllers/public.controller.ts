import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common'
import { IResponsePaginate } from '@riverrun/interface'
import { Request, Response } from 'express'
import { Payment } from '../entities/payment.entity'
import { PaymentService } from '../services/payment.service'

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const currentPage = page || 1
    const perPage = limit || 20
    const query = await this.paymentService.findAll(currentPage, perPage)
    const total = await this.paymentService.count()
    const response: IResponsePaginate<Payment[]> = {
      success: true,
      total: total,
      currentPage: currentPage,
      perPage: perPage,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }
}
