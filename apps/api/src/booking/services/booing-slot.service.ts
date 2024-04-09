import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomDto } from '@riverrun/interface'
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
    const bookingSlots = await this.bookingSlot
      .createQueryBuilder('booking_slots')
      .leftJoinAndSelect('booking_slots.room', 'rooms')
      .leftJoinAndSelect('booking_slots.booking', 'bookings')
      .where('booking_slots.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .orWhere('booking_slots.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .getMany()

    const rooms = await this.roomService
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.images', 'images')
      .getMany()

    const allRooms: RoomDto[] = rooms

    // // หาห้องที่จอง แล้วลบจำนวน
    if (bookingSlots.length > 0) {
      rooms.forEach((x, i) => {
        bookingSlots.forEach((y) => {
          if (y.room.id === x.id && x.amount) {
            const update = {
              ...x,
              amount: allRooms[i].amount - y.roomAmount
            }

            allRooms[i] = update
          }
        })
      })
    }

    return allRooms.filter((x) => x.amount >= amount || x.amount > 0)
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
      .where(`booking_slots.roomId = ${roomId}`)
      .andWhere('booking_slots.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startBookingDate,
        endBookingDate: endBookingDate
      })
      .andWhere('booking_slots.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startBookingDate,
        endBookingDate: endBookingDate
      })
      .getMany()

    let total = 0
    check.map((x) => {
      total = x.roomAmount + total
    })

    const room = await this.roomService
      .createQueryBuilder('rooms')
      .where(`rooms.id = ${roomId}`)
      .getOne()

    if (room.amount - total < amount) {
      return true
    }
  }
}
