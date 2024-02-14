import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Booking } from '../../booking/entities/booking.entity'
import { RoomCategory } from './category-room.entity'
import { RoomImage } from './room-image.entity'

@Entity({
  name: 'rooms'
})
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => RoomCategory, (roomCategory) => roomCategory.id)
  category: RoomCategory

  @Column()
  name: string

  @Column()
  pricePerNight: number

  @Column()
  detail: string

  @Column()
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[]

  @OneToMany(() => RoomImage, (images) => images.room)
  images: RoomImage[]
}
