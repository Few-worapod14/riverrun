import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AdminCreateDto, AdminUpdateDto } from '@riverrun/interface'
import { hashSync } from 'bcrypt'
import { DeleteResult, Like, Or, Repository } from 'typeorm'
import { Admin } from '../entities/admin.entity'
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) {}

  async onModuleInit() {
    const password = hashSync('sqlr00t', 10)
    const insert = {
      username: 'admin',
      email: 'admin@admin.com',
      password: password,
      firstName: 'admin',
      lastName: 'admin'
    }
    const check = await this.adminRepository.findOne({
      where: {
        username: 'admin'
      }
    })
    if (!check) {
      this.adminRepository.save(insert)
    }
  }

  async findAll(page: number, limit: number, keyword?: string): Promise<Admin[]> {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    if (!keyword) {
      return this.adminRepository.find({
        skip: skip,
        take: limit
      })
    }

    return this.adminRepository.find({
      skip: skip,
      take: limit,
      where: [
        { firstName: Or(Like(`%${keyword}%`)) },
        { lastName: Or(Like(`%${keyword}%`)) },
        { email: Or(Like(`%${keyword}%`)) },
        { username: Or(Like(`%${keyword}%`)) }
      ]
    })
  }

  count(keyword?: string): Promise<number> {
    if (!keyword) {
      return this.adminRepository.count()
    }

    return this.adminRepository.count({
      where: [
        { firstName: Or(Like(`%${keyword}%`)) },
        { lastName: Or(Like(`%${keyword}%`)) },
        { email: Or(Like(`%${keyword}%`)) },
        { username: Or(Like(`%${keyword}%`)) }
      ]
    })
  }

  findByID(id: number) {
    return this.adminRepository.findOne({
      where: {
        id
      }
    })
  }

  create(data: AdminCreateDto) {
    const password = hashSync(data.password, 10)
    const insert = {
      ...data,
      password: password
    }
    return this.adminRepository.save(insert)
  }

  update(id: number, data: AdminUpdateDto) {
    if (data?.password) {
      const password = hashSync(data.password, 10)
      const update = {
        ...data,
        password: password
      }
      return this.adminRepository.update(id, update)
    } else {
      return this.adminRepository.update(id, data)
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.adminRepository.delete(id)
  }
}
