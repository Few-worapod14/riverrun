import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BookingCreateDto, BookingUpdateDto } from '@riverrun/interface'
import * as dayjs from 'dayjs'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Booking } from '../entities/booking.entity'

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingService: Repository<Booking>
  ) {}

  create(userId: number, data: BookingCreateDto): Promise<Booking> {
    return this.bookingService.save({
      ...data,
      startData: dayjs(data.startDate),
      endDate: dayjs(data.endDate),
      user: {
        id: userId
      },
      room: {
        id: data.roomId
      },
      paid: false
    })
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
        user: {
          id: userId
        }
      }
    })
  }

  findByIDUser(id: number, userId: number): Promise<Booking> {
    return this.bookingService.findOne({
      where: {
        id,
        user: {
          id: userId
        }
      }
    })
  }

  countByUser(userId: number): Promise<number> {
    return this.bookingService.count({
      where: {
        user: {
          id: userId
        }
      }
    })
  }
}
