import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoomAmenityList } from './room-amenity-lists.entity'
import { Room } from './room.entity'

@Entity({
  name: 'room_amenities'
})
export class RoomAmenity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Room, (room) => room.images)
  room: Room

  @Column()
  name: string

  @OneToMany(() => RoomAmenityList, (lists) => lists.roomAmenity, { cascade: true })
  lists: RoomAmenityList[]
}
