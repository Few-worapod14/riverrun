import { USER_ROLE } from '@riverrun/interface'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  mobile: string

  @Column()
  password?: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ enum: USER_ROLE, default: USER_ROLE.USER })
  role: USER_ROLE

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
