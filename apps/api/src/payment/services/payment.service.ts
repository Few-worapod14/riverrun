import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaymentCreateDto, PaymentUpdateDto } from '@riverrun/interface'
import * as fs from 'fs'
import { Repository } from 'typeorm'
import { Payment } from '../entities/payment.entity'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async create(data: PaymentCreateDto, file?: Express.Multer.File) {
    let create
    if (file) {
      const fullPath = process.env.FILE_PATH + '/' + file?.path
      const path = file?.path
      create = { ...data, fullPath: fullPath, path: path }
    } else {
      create = { ...data }
    }
    const payment = await this.paymentRepository.save(create)
    return payment
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.paymentRepository.find({
      skip: skip,
      take: limit,
      order: {
        id: 'DESC'
      }
    })
  }

  findByID(id: number) {
    return this.paymentRepository.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, data: PaymentUpdateDto, file?: Express.Multer.File) {
    let update

    if (file) {
      const fullPath = process.env.FILE_PATH + '/' + file?.path
      const path = file?.path
      update = { ...data, id: id, fullPath: fullPath, path: path }
    } else {
      update = { ...data, id: id }
    }
    return this.paymentRepository.save(update)
  }

  remove(id: number) {
    return this.paymentRepository.delete(id)
  }

  count(): Promise<number> {
    return this.paymentRepository.count()
  }

  async removeImg(id: number) {
    const payment = await this.findByID(id)

    if (fs.existsSync(payment?.path)) {
      fs.unlinkSync(payment?.path)
    }

    return await this.paymentRepository.save({ ...payment, path: null, fullPath: null })
  }
}
