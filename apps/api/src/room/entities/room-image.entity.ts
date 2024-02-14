import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity'

@Entity({
  name: 'room_images'
})
export class RoomImage {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Room, (room) => room.images)
  room: Room

  @Column()
  fileName: string

  @Column()
  path: string

  @Column()
  fullPath: string
}
