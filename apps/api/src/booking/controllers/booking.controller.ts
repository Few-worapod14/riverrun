import { BadRequestException, Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { Response } from 'express'
import { IRequestWithUser } from 'src/auth/requet.interface'
import { RoomBookedService } from '../services/room-booked.service'

@Controller('bookings/search')
export class BookingController {
  constructor(private roomBookedService: RoomBookedService) {}

  @Get('/')
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('startBookingDate') startBookingDate: Date,
    @Query('endBookingDate') endBookingDate: Date
  ) {
    const now = dayjs()
    if (dayjs(startBookingDate).isBefore(now)) {
      throw new BadRequestException('Date not available.')
    }

    const query = await this.roomBookedService.findAvailable(startBookingDate, endBookingDate)

    const total = await this.roomBookedService.count(startBookingDate, endBookingDate)
    const response = {
      success: true,
      total: total,
      currentPage: 1,
      perPage: 1000,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }
}
