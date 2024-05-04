import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RoomAmenity } from './room-amenity.entity'

@Entity({
  name: 'room_amenity_lists'
})
export class RoomAmenityList {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => RoomAmenity, (roomAmenity) => roomAmenity.lists)
  roomAmenity: RoomAmenity

  @Column()
  name: string
}
