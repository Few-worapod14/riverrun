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
  name: 'bookings'
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  startBookingDate: Date

  @Column()
  endBookingDate: Date

  @Column({ nullable: true })
  checkInDate?: Date

  @Column({ nullable: true })
  checkOutDate?: Date

  @ManyToOne(() => Room, (room) => room.id)
  room: Room

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer

  @Column()
  adult: number

  @Column()
  children: number

  @Column()
  days: number

  @Column()
  discount: number

  @Column()
  total: number

  @Column()
  totalAmount: number

  @Column({ nullable: true })
  note?: string

  @Column()
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
