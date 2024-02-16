import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
