import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Customer } from '../../customer/entities/customer.entity'
import { BookingSlot } from './booking-slot.entity'

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

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer?: Customer

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  mobile?: string

  @Column()
  roomAmount: number

  @Column()
  adult: number

  @Column()
  children: number

  @Column()
  days: number

  @Column()
  total: number

  @Column({ nullable: true })
  note?: string

  @Column()
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => BookingSlot, (room) => room)
  slots: BookingSlot[]
}
