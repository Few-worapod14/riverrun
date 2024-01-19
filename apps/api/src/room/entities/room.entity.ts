import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { RoomCategory } from './category-room.entity'

@Entity({
  name: 'rooms'
})
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => RoomCategory, (roomCategory) => roomCategory.id)
  category: RoomCategory

  @Column()
  amount: number

  @Column()
  price: number

  @Column()
  detail: string

  @Column()
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
