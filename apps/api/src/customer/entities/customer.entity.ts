import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Booking } from '../../booking/entities/booking.entity'

@Entity({
  name: 'customers'
})
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  mobile: string

  @Column({ nullable: true })
  password?: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  bookings: Booking
}
