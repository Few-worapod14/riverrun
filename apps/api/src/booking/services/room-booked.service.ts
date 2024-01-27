import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as dayjs from 'dayjs'
import { Repository } from 'typeorm'
import { Room } from '../../room/entities/room.entity'
import { RoomBooked } from '../entities/room-booked.entity'

@Injectable()
export class RoomBookedService {
  constructor(
    @InjectRepository(Room)
    private roomService: Repository<Room>,
    @InjectRepository(RoomBooked)
    private roomBookedService: Repository<RoomBooked>
  ) {}

  async findAvailable(startBookingDate: Date, endBookingDate: Date) {
    const startDateTime = dayjs(startBookingDate).format('YYYY-MM-DD 14:00:00')
    const endDateTime = dayjs(endBookingDate).format('YYYY-MM-DD 12:00:00')

    const subQuery = await this.roomBookedService
      .createQueryBuilder('room_booked')
      .leftJoinAndSelect('room_booked.room', 'rooms')
      .where('room_booked.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .orWhere('room_booked.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .getMany()

    const rooms = subQuery.map((x) => x.room.id)

    const query = this.roomService.createQueryBuilder('rooms')
    if (rooms.length != 0) {
      query.where(`rooms.id NOT IN (${rooms})`)
    }

    return await query.getMany()
  }

  count(startBookingDate: Date, endBookingDate: Date) {
    const startDateTime = dayjs(startBookingDate).format('YYYY-MM-DD 14:00:00')
    const endDateTime = dayjs(endBookingDate).format('YYYY-MM-DD 12:00:00')

    return this.roomBookedService
      .createQueryBuilder('room_booked')
      .where('room_booked.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .orWhere('room_booked.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .getCount()
  }

  async checkAvailableRoom(roomId: number, startBookingDate: Date, endBookingDate: Date) {
    const startDateTime = dayjs(startBookingDate).format('YYYY-MM-DD 14:00:00')
    const endDateTime = dayjs(endBookingDate).format('YYYY-MM-DD 12:00:00')

    const check = await this.roomBookedService
      .createQueryBuilder('room_booked')
      .leftJoinAndSelect('room_booked.room', 'rooms')
      .where('room_booked.roomId = :id', { id: roomId })
      .where('room_booked.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .orWhere('room_booked.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startDateTime,
        endBookingDate: endDateTime
      })
      .getOne()

    if (!check) {
      return
    }

    return await this.roomService
      .createQueryBuilder('rooms')
      .where(`rooms.id != ${check.room.id}`)
      .getOne()
  }
}
