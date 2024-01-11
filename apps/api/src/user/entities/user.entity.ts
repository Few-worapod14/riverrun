import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username?: string

  @Column()
  email: string

  @Column()
  mobile: string

  @Column()
  password?: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  isActive:boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
