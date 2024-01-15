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
  start_date: Date

  @Column()
  end_date: Date

  @ManyToOne(() => Room, (room) => room.id)
  room: Room

  @ManyToOne(() => User, (user) => user.id)
  user?: User

  @Column()
  adult: number

  @Column()
  children: number

  @Column()
  price: number

  @Column()
  paid: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
