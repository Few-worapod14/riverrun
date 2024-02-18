import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import {
  IResponseData,
  IResponsePaginate,
  PaymentCreateDto,
  PaymentUpdateDto
} from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { Payment } from '../entities/payment.entity'
import { PaymentService } from '../services/payment.service'

@UseGuards(AdminGuard)
@Controller('admins/payments')
export class AdminPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() body: PaymentCreateDto) {
    const query = await this.paymentService.create(body)
    const payment = await this.paymentService.findByID(query.id)
    const response: IResponseData<Payment> = {
      data: payment,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

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

  @Get(':id')
  async findByID(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.paymentService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<Payment> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PaymentUpdateDto
  ) {
    const check = await this.paymentService.findByID(id)
    if (!check) {
      throw new NotFoundException('id not found')
    }
    await this.paymentService.update(id, body)
    const query = await this.paymentService.findByID(id)
    const response: IResponseData<Payment> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.paymentService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.paymentService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
