import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Room } from '../../room/entities/room.entity'
import { BookingSlot } from '../entities/booking-slot.entity'

@Injectable()
export class BookingSlotService {
  constructor(
    @InjectRepository(Room)
    private roomService: Repository<Room>,
    @InjectRepository(BookingSlot)
    private bookingSlot: Repository<BookingSlot>
  ) {}

  async findAvailable(startDateTime: string, endDateTime: string, amount: number) {
    const subQuery = await this.bookingSlot
      .createQueryBuilder('booking_slots')
      .leftJoinAndSelect('booking_slots.room', 'rooms')
      .where('booking_slots.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .orWhere('booking_slots.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .getMany()

    const query = await this.roomService
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.images', 'images')
      .getMany()

    let filterRooms = []
    query.forEach((x) => {
      subQuery.forEach((y) => {
        if (y.room.id === x.id) {
          console.log(x.amount, y.roomAmount, amount, x.amount - y.roomAmount > amount)
          if (x.amount - y.roomAmount > amount) {
            filterRooms.push(x)
          }
        }
      })
    })
    return filterRooms
  }

  async count(startDateTime: string, endDateTime: string) {
    const subQuery = await this.bookingSlot
      .createQueryBuilder('booking_slots')
      .leftJoinAndSelect('booking_slots.room', 'rooms')
      .where('booking_slots.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .orWhere('booking_slots.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .getMany()

    const rooms = subQuery.map((x) => x.room.id)

    const query = this.roomService.createQueryBuilder('rooms')
    if (rooms.length != 0) {
      query.where(`rooms.id NOT IN (${rooms})`)
    }

    return await query.getCount()
  }

  async checkAvailableRoom(
    roomId: number,
    startBookingDate: string,
    endBookingDate: string,
    amount: number
  ) {
    const check = await this.bookingSlot
      .createQueryBuilder('booking_slots')
      .leftJoinAndSelect('booking_slots.room', 'rooms')
      .where('booking_slots.roomId = :id', { id: roomId })
      .where('booking_slots.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startBookingDate,
        endBookingDate: endBookingDate
      })
      .orWhere('booking_slots.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startBookingDate,
        endBookingDate: endBookingDate
      })
      .getCount()

    if (check == 0) {
      return
    }

    const room = await this.roomService
      .createQueryBuilder('rooms')
      .where(`rooms.id != ${roomId}`)
      .getOne()

    if (room.amount - check > amount) {
      return true
    }
  }
}
