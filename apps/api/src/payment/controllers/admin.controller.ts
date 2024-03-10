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
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
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

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: PaymentCreateDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const query = await this.paymentService.create(body, file)
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
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PaymentUpdateDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const check = await this.paymentService.findByID(id)
    if (!check) {
      throw new NotFoundException('id not found')
    }
    await this.paymentService.update(id, body, file)
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

  @Delete(':id/image')
  async removeImage(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    const query = await this.paymentService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.paymentService.removeImg(id)
    const response: IResponseData<string> = {
      message: 'Delete image successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
