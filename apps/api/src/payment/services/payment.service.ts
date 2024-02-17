import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'
import { Repository } from 'typeorm'
import { Payment } from '../entities/payment.entity'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async create(data: RoomCreateDto) {
    const pkg = data.packages.split(',').map(Number)
    const promises = pkg.map(async (x) => {
      const data = await this.paymentRepository.findOne({ where: { id: x } })
      return data
    })
    const options = await Promise.all(promises)

    const save = {
      ...data,
      category: {
        id: data.categoryId
      },
      packages: options
    }
    delete save.categoryId
    const room = await this.paymentRepository.save(save)

    return room
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

  async update(id: number, data: RoomUpdateDto) {
    return this.paymentRepository.save(data)
  }

  remove(id: number) {
    return this.paymentRepository.delete(id)
  }

  count(): Promise<number> {
    return this.paymentRepository.count()
  }
}
