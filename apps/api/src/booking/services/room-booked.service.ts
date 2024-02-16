import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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

  async findAvailable(startDateTime: string, endDateTime: string, room: number) {
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

    const query = this.roomService
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.images', 'images')
      .leftJoinAndSelect('rooms.packages', 'packages')
    if (rooms.length != 0) {
      query.where(`rooms.id NOT IN (${rooms})`)
    }

    return await query.getMany()
  }

  async count(startDateTime: string, endDateTime: string, room: number) {
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

    return await query.getCount()
  }

  async checkAvailableRoom(roomId: number, startBookingDate: string, endBookingDate: string) {
    const check = await this.roomBookedService
      .createQueryBuilder('room_booked')
      .leftJoinAndSelect('room_booked.room', 'rooms')
      .leftJoinAndSelect('rooms.packages', 'packages')
      .where('room_booked.roomId = :id', { id: roomId })
      .where('room_booked.startBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startBookingDate,
        endBookingDate: endBookingDate
      })
      .orWhere('room_booked.endBookingDate BETWEEN :startBookingDate AND :endBookingDate', {
        startBookingDate: startBookingDate,
        endBookingDate: endBookingDate
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
