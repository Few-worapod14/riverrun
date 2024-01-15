import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { BookingUpdateDto, IResponseData, IResponsePaginate } from '@riverrun/interface'
import { Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { IRequestWithUser } from '../../auth/requet.interface'
import { Booking } from '../entities/booking.entity'
import { BookingService } from '../services/booking.service'

@UseGuards(AdminGuard)
@Controller('/admins/bookings')
export class BookingAdminController {
  constructor(private bookingService: BookingService) {}

  @Get()
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    try {
      const currentPage = page || 1
      const perPage = limit || 10
      const query = await this.bookingService.findAll(currentPage, perPage)
      const total = await this.bookingService.count()
      const response: IResponsePaginate<Booking[]> = {
        success: true,
        total: total,
        currentPage: currentPage,
        perPage: perPage,
        data: query
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData<string> = {
        message: error,
        success: false
      }
      throw new HttpException(msg, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  async findByID(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    try {
      const userId = req.user.sub
      const query = await this.bookingService.findByID(id)
      const response: IResponseData<Booking> = {
        data: query,
        success: true
      }

      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData<string> = {
        message: error,
        success: false
      }
      throw new HttpException(msg, HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':id')
  async update(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: BookingUpdateDto
  ) {
    try {
      const query = await this.bookingService.update(id, body)
      const response: IResponseData<string> = {
        message: 'Booking room update successfully',
        success: true
      }

      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData<string> = {
        message: error,
        success: false
      }
      throw new HttpException(msg, HttpStatus.BAD_REQUEST)
    }
  }
}
