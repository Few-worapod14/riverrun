import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { USER_ROLE, UserCreateDto, UserUpdateDto } from '@riverrun/interface'
import { hashSync } from 'bcrypt'
import * as dayjs from 'dayjs'
import { Not, Repository, UpdateResult } from 'typeorm'
import { User } from '../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(data: UserCreateDto): Promise<User> {
    const password = hashSync(data.password, 10)
    const insert = {
      ...data,
      role: USER_ROLE.USER,
      password: password
    }
    return this.userRepository.save(insert)
  }

  findAll(page: number, limit: number): Promise<User[]> {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.userRepository.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  findByCriteria(criteria: any, userId?: number): Promise<User> {
    let filters = {
      ...criteria
    }
    if (userId) {
      filters.id = Not(userId)
    }

    return this.userRepository.findOne({
      where: filters
    })
  }

  update(id: number, data: UserUpdateDto): Promise<UpdateResult> {
    let update = {
      ...data
    }
    if (data.password) {
      const password = hashSync(data.password, 10)
      update.password = password
    }

    return this.userRepository.update(id, update)
  }

  remove(id: number): Promise<UpdateResult> {
    const now = dayjs()

    return this.userRepository.update(id, {
      deletedAt: now
    })
  }

  count(): Promise<number> {
    return this.userRepository.count()
  }
}
