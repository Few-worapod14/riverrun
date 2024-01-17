import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Room } from '../../room/entities/room.entity'
import { User } from '../../user/entities/user.entity'

@Entity({
  name: 'bookings'
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @ManyToOne(() => Room, (room) => room.id)
  room: Room

  @ManyToOne(() => User, (user) => user.id)
  user?: User

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
  paid: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
