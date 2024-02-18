import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'payments'
})
export class Payment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  no: string

  @Column()
  bank: string

  @Column()
  branch: string

  @Column()
  name: string

  @Column()
  isPromtpay: boolean

  @Column({ nullable: true })
  promtPayNumber: string
}
