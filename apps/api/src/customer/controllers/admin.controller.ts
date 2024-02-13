import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { CustomerUpdateDto, IResponseData, IResponsePaginate } from '@riverrun/interface'
import { Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { IRequestWithUser } from '../../auth/requet.interface'
import { Customer } from '../entities/customer.entity'
import { CustomerService } from '../services/customer.service'

@UseGuards(AdminGuard)
@Controller('/admins/customers')
export class AdminCustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('keyword') keyword?: string
  ) {
    const currentPage = page || 1
    const perPage = limit || 20
    const query = await this.customerService.findAll(currentPage, perPage, keyword)
    const total = await this.customerService.count(keyword)
    const response: IResponsePaginate<Customer[]> = {
      success: true,
      total: total,
      currentPage: currentPage,
      perPage: perPage,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Get(':id')
  async findByID(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    const userId = req.user.sub
    const query = await this.customerService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<Customer> = {
      data: query,
      success: true
    }

    res.status(HttpStatus.OK).json(response)
  }

  @Put(':id')
  async update(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CustomerUpdateDto
  ) {
    const query = await this.customerService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.customerService.update(id, body)
    const customer = await this.customerService.findByID(id)
    const response: IResponseData<Customer> = {
      data: customer,
      success: true
    }

    res.status(HttpStatus.OK).json(response)
  }
}
