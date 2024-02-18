import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaymentCreateDto, PaymentUpdateDto } from '@riverrun/interface'
import { Repository } from 'typeorm'
import { Payment } from '../entities/payment.entity'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async create(data: PaymentCreateDto) {
    return await this.paymentRepository.save(data)
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.paymentRepository.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number) {
    return this.paymentRepository.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, data: PaymentUpdateDto) {
    return this.paymentRepository.save(data)
  }

  remove(id: number) {
    return this.paymentRepository.delete(id)
  }

  count(): Promise<number> {
    return this.paymentRepository.count()
  }
}
