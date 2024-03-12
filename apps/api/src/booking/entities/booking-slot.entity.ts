import { Room } from 'src/room/entities/room.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => Booking, (booking) => booking.id)
  @JoinColumn()
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
