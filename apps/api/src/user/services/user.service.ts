import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserCreateDto, UserUpdateDto } from '@riverrun/interface'
import { hashSync } from 'bcrypt'
import * as dayjs from 'dayjs'
import { Repository, UpdateResult } from 'typeorm'
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

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  update(id: number, data: UserUpdateDto): Promise<UpdateResult> {
    return this.userRepository.update(id, data)
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
