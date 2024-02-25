import { Room } from 'src/room/entities/room.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Booking } from './booking.entity'

@Entity({
  name: 'booking_slots'
})
export class BookingSlot {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Booking, (booking) => booking.id)
  booking: Booking

  @ManyToOne(() => Room, (room) => room.id)
  room: Room

  @Column()
  roomAmount: number

  @Column()
  startBookingDate: Date

  @Column()
  endBookingDate: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
