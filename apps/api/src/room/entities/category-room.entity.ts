import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'room_categories'
})
export class RoomCategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  isActive: boolean
}
