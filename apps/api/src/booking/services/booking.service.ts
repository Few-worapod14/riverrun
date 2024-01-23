import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BookingCreateDto, BookingUpdateDto } from '@riverrun/interface'
import * as dayjs from 'dayjs'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Room } from '../../room/entities/room.entity'
import { Booking } from '../entities/booking.entity'

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingService: Repository<Booking>,
    @InjectRepository(Room)
    private roomService: Repository<Room>
  ) {}

  async create(userId: number, data: BookingCreateDto): Promise<Booking> {
    const startDate = dayjs(data.startDate)
    const endDate = dayjs(data.endDate)
    const days = endDate.diff(startDate, 'days')

    const room = await this.roomService.findOne({
      where: {
        id: data.roomId
      },
      relations: {
        bookings: true
      }
    })

    console.log('----', room)

    const total: number = days * room.pricePerNight
    const discount = 0
    const netTotal: number = total - discount

    const save = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      user: {
        id: userId
      },
      room: {
        id: data.roomId
      },
      adult: data.adult,
      children: data.children,
      days: days,
      total: total,
      discount: discount,
      netTotal: netTotal,
      paid: false
    }

    return await this.bookingService.save(save)
  }

  findAll(page: number, limit: number): Promise<Booking[]> {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.bookingService.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number): Promise<Booking> {
    return this.bookingService.findOne({
      where: {
        id
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
      }
    })
  }

  countByUser(userId: number): Promise<number> {
    return this.bookingService.count({
      where: {
        customer: {
          id: userId
        }
      }
    })
  }
}
