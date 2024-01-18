import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { BookingCreateDto, IResponseData, IResponsePaginate } from '@riverrun/interface'
import { Response } from 'express'
import { IRequestWithUser } from 'src/auth/requet.interface'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { Booking } from '../entities/booking.entity'
import { BookingService } from '../services/booking.service'

@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('/')
  async create(@Req() req: IRequestWithUser, @Res() res: Response, @Body() body: BookingCreateDto) {
    const userId = req.user.sub
    await this.bookingService.create(userId, body)
    const response: IResponseData<string> = {
      message: 'Booking room successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Get('/')
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const userId = req.user.sub
    const currentPage = page || 1
    const perPage = limit || 10
    const query = await this.bookingService.findAllByUser(currentPage, perPage, userId)
    const total = await this.bookingService.count()
    const response: IResponsePaginate<Booking[]> = {
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
    const query = await this.bookingService.findByIDUser(id, userId)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<Booking> = {
      data: query,
      success: true
    }

    res.status(HttpStatus.OK).json(response)
  }
}
