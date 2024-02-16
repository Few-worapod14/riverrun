import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from '../../room/entities/room.entity'

@Entity({
  name: 'packages'
})
export class Package {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  detail: string

  @ManyToOne(() => Room, (room) => room.packages)
  room: Room
}
