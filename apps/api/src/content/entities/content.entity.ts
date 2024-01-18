import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'contents'
})
export class Content {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  slug: string
}
