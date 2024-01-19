import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomCategoryCreateDto, RoomCategoryUpdateDto } from '@riverrun/interface'
import { Repository } from 'typeorm'
import { RoomCategory } from '../entities/category-room.entity'

@Injectable()
export class RoomCategoryService {
  constructor(
    @InjectRepository(RoomCategory)
    private categoryRepository: Repository<RoomCategory>
  ) {}

  create(data: RoomCategoryCreateDto) {
    return this.categoryRepository.save(data)
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.categoryRepository.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, data: RoomCategoryUpdateDto) {
    return this.categoryRepository.update(id, data)
  }

  remove(id: number) {
    return this.categoryRepository.delete(id)
  }

  count(): Promise<number> {
    return this.categoryRepository.count()
  }
}
