import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Req,
  Res
} from '@nestjs/common'
import { BookingCreateDto, ERROR_MSG_TYPE, IErrorDto, IResponseData } from '@riverrun/interface'
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
import { Response } from 'express'
import { IRequestWithUser } from '../../auth/request.interface'
import { RoomService } from '../../room/services/room.service'
import { Booking } from '../entities/booking.entity'
import { BookingSlotService } from '../services/booing-slot.service'
import { BookingService } from '../services/booking.service'

dayjs.extend(customParseFormat)

@Controller('bookings')
export class BookingController {
  constructor(
    private bookingSlotService: BookingSlotService,
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  @Get('/search')
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('startBooking') startDate: string,
    @Query('endBooking') endDate: string,
    @Query('roomBooking') amount: number
  ) {
    const now = dayjs()
    if (dayjs(startDate, 'DD-MM-YYYY').isBefore(now)) {
      const errors: IErrorDto = {
        message: [
          {
            property: ERROR_MSG_TYPE.SYSTEM,
            message: 'วันจองไม่ถูกต้อง'
          }
        ],
        success: false
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errors)
    }

    const startBookingDate = dayjs(dayjs(startDate, 'DD-MM-YYYY').toDate()).format(
      'YYYY-MM-DD 14:00:00'
    )
    const endBookingDate = dayjs(dayjs(endDate, 'DD-MM-YYYY').toDate()).format(
      'YYYY-MM-DD 12:00:00'
    )

    const query = await this.bookingSlotService.findAvailable(
      startBookingDate,
      endBookingDate,
      amount
    )
    const total = await this.bookingSlotService.count(startBookingDate, endBookingDate)

    const response = {
      success: true,
      total: total,
      currentPage: 1,
      perPage: -1,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Post('/')
  async create(@Req() req: IRequestWithUser, @Res() res: Response, @Body() body: BookingCreateDto) {
    const userId = req?.user?.sub || null
    const room = await this.roomService.findByID(body.roomId)
    if (!room) {
      throw new NotFoundException('ID not found')
    }

    const startBookingDate = dayjs(body.startBookingDate).format('YYYY-MM-DD 14:00:00')
    const endBookingDate = dayjs(body.endBookingDate).format('YYYY-MM-DD 12:00:00')

    const checkAvailableRoom = await this.bookingSlotService.checkAvailableRoom(
      body.roomId,
      startBookingDate,
      endBookingDate,
      body.roomAmount
    )

    if (checkAvailableRoom) {
      const errors: IErrorDto = {
        message: [
          {
            property: ERROR_MSG_TYPE.SYSTEM,
            message: 'ห้องพักไม่ว่าง'
          }
        ],
        success: false
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errors)
    }

    const query = await this.bookingService.create(body, userId)
    const response: IResponseData<Booking> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
