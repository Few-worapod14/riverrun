import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CustomerCreateDto, CustomerUpdateDto } from '@riverrun/interface'
import { hashSync } from 'bcrypt'
import * as dayjs from 'dayjs'
import { Like, Not, Or, Repository, UpdateResult } from 'typeorm'
import { Customer } from '../entities/customer.entity'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerService: Repository<Customer>
  ) {}

  create(data: CustomerCreateDto): Promise<Customer> {
    const password = hashSync(data.password, 10)
    const insert = {
      ...data,
      password: password
    }
    return this.customerService.save(insert)
  }

  findAll(page: number, limit: number, keyword?: string): Promise<Customer[]> {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    if (!keyword) {
      return this.customerService.find({
        skip: skip,
        take: limit
      })
    }

    return this.customerService.find({
      skip: skip,
      take: limit,
      where: [
        { firstName: Or(Like(`%${keyword}%`)) },
        { lastName: Or(Like(`%${keyword}%`)) },
        { email: Or(Like(`%${keyword}%`)) },
        { mobile: Or(Like(`%${keyword}%`)) }
      ]
    })
  }

  findByID(id: number): Promise<Customer> {
    return this.customerService.findOne({
      where: {
        id
      }
    })
  }

  findByCriteria(criteria: any, userId?: number): Promise<Customer> {
    let filters = {
      ...criteria
    }
    if (userId) {
      filters.id = Not(userId)
    }

    return this.customerService.findOne({
      where: filters
    })
  }

  update(id: number, data: CustomerUpdateDto): Promise<UpdateResult> {
    let update = {
      ...data
    }
    if (data.password) {
      const password = hashSync(data.password, 10)
      update.password = password
    }

    return this.customerService.update(id, update)
  }

  remove(id: number): Promise<UpdateResult> {
    const now = dayjs()

    return this.customerService.update(id, {
      deletedAt: now
    })
  }

  count(keyword?: string): Promise<number> {
    if (!keyword) {
      return this.customerService.count()
    }
    return this.customerService.count({
      where: [
        { firstName: Or(Like(`%${keyword}%`)) },
        { lastName: Or(Like(`%${keyword}%`)) },
        { email: Or(Like(`%${keyword}%`)) },
        { mobile: Or(Like(`%${keyword}%`)) }
      ]
    })
  }
}
