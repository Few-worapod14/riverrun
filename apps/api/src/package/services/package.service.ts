import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PackageCreateDto, PackageUpdateDto } from '@riverrun/interface'
import { Repository } from 'typeorm'
import { Package } from '../entities/package.entity'

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>
  ) {}

  async create(data: PackageCreateDto) {
    return await this.packageRepository.save(data)
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.packageRepository.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number) {
    return this.packageRepository.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, data: PackageUpdateDto) {
    return this.packageRepository.update(id, data)
  }

  remove(id: number) {
    return this.packageRepository.delete(id)
  }

  count(): Promise<number> {
    return this.packageRepository.count()
  }
}
