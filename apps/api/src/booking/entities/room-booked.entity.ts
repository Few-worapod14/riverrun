import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Customer } from '../../customer/entities/customer.entity'
import { Room } from '../../room/entities/room.entity'

@Entity({
  name: 'room_booked'
})
export class RoomBooked {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Room, (room) => room.id)
  room: Room

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer

  @Column()
  startBookingDate: Date

  @Column()
  endBookingDate: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
