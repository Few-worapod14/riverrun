import { BadRequestException, Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common'
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
import { Response } from 'express'
import { IRequestWithUser } from 'src/auth/requet.interface'
import { RoomBookedService } from '../services/room-booked.service'

dayjs.extend(customParseFormat)

@Controller('bookings')
export class BookingController {
  constructor(private roomBookedService: RoomBookedService) {}

  @Get('/search')
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('startBooking') startDate: string,
    @Query('endBooking') endDate: string,
    @Query('roomBooking') room: number
  ) {
    const now = dayjs()
    if (dayjs(startDate).isBefore(now)) {
      throw new BadRequestException('Date not available.')
    }

    const startBookingDate = dayjs(dayjs(startDate, 'DD-MM-YYYY').toDate()).format(
      'YYYY-MM-DD 14:00:00'
    )
    const endBookingDate = dayjs(dayjs(endDate, 'DD-MM-YYYY').toDate()).format(
      'YYYY-MM-DD 12:00:00'
    )

    const query = await this.roomBookedService.findAvailable(startBookingDate, endBookingDate, room)
    const total = await this.roomBookedService.count(startBookingDate, endBookingDate, room)

    const response = {
      success: true,
      total: total,
      currentPage: 1,
      perPage: -1,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }
}
