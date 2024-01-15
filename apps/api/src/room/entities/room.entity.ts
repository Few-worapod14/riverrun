import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'rooms'
})
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  detail: string

  @Column()
  isActive: boolean
}
