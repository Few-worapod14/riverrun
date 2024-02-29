import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
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

  @Column({ unique: true })
  slug: string

  @Column()
  pricePerNight: number

  @Column()
  amount: number

  @Column()
  detail: string

  @Column()
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => RoomImage, (images) => images.room)
  images: RoomImage[]
}
