import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BOOKING_STATUS, BookingCreateDto, BookingUpdateDto } from '@riverrun/interface'
import * as dayjs from 'dayjs'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Room } from '../../room/entities/room.entity'
import { BookingSlot } from '../entities/booking-slot.entity'
import { Booking } from '../entities/booking.entity'

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingService: Repository<Booking>,
    @InjectRepository(Room)
    private roomService: Repository<Room>,
    @InjectRepository(BookingSlot)
    private bookingSlot: Repository<BookingSlot>
  ) {}

  async create(data: BookingCreateDto, userId?: number): Promise<Booking> {
    const startDate = dayjs(data.startBookingDate)
    const endDate = dayjs(data.endBookingDate)
    const days = endDate.diff(startDate, 'days')

    const room = await this.roomService.findOne({
      where: {
        id: data.roomId
      },
      relations: {
        // customer: true
      }
    })

    const total: number = days * room.pricePerNight
    // const discount = data.discount
    // const totalAmount: number = total - discount

    const save = {
      startBookingDate: startDate.format('YYYY-MM-DD 14:00:00'),
      endBookingDate: endDate.format('YYYY-MM-DD 12:00:00'),
      user: {
        id: userId
      },
      room: {
        id: data.roomId
      },
      roomAmount: data.roomAmount,
      adult: data.adult,
      children: data.children,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      days: days,
      total: total,
      // discount: discount,
      // totalAmount: totalAmount,
      status: BOOKING_STATUS.BOOKING
    }

    const result = await this.bookingService.save(save)

    const bookingRoom = {
      room: {
        id: room.id
      },
      roomAmount: data.roomAmount,
      booking: {
        id: result.id
      },
      customer: {
        id: userId
      },
      startBookingDate: startDate.format('YYYY-MM-DD 14:00:00'),
      endBookingDate: endDate.format('YYYY-MM-DD 12:00:00')
    }
    await this.bookingSlot.save(bookingRoom)

    return result
  }

  findAll(page: number, limit: number): Promise<Booking[]> {
    const skip: number = page == 1 ? 0 : limit * (page - 1)

    return this.bookingService.find({
      skip: skip,
      take: limit,
      relations: {
        customer: true,
        slot: {
          room: true
        }
      }
    })
  }

  findByID(id: number): Promise<Booking> {
    return this.bookingService.findOne({
      where: {
        id
      },
      relations: {
        customer: true,
        slot: {
          room: true
        }
      }
    })
  }

  update(id: number, data: BookingUpdateDto): Promise<UpdateResult> {
    return this.bookingService.update(id, data)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.bookingService.delete(id)
  }

  count(): Promise<number> {
    return this.bookingService.count()
  }

  findAllByUser(page: number, limit: number, userId: number): Promise<Booking[]> {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.bookingService.find({
      skip: skip,
      take: limit,
      where: {
        customer: {
          id: userId
        }
      }
    })
  }

  findByIDUser(id: number, userId: number): Promise<Booking> {
    return this.bookingService.findOne({
      where: {
        id,
        customer: {
          id: userId
        }
      },
      relations: {
        customer: true
      }
    })
  }

  countByUser(userId: number): Promise<number> {
    return this.bookingService.count({
      where: {
        customer: {
          id: userId
        }
      },
      relations: {
        customer: true
      }
    })
  }
}
