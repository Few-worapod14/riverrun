import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'
import { Repository } from 'typeorm'
import { Room } from '../entities/room.entity'

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>
  ) {}

  create(data: RoomCreateDto) {
    const save = {
      ...data,
      category: {
        id: data.categoryId
      }
    }
    delete save.categoryId
    return this.roomRepository.save(save)
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.roomRepository.find({
      skip: skip,
      take: limit,
      relations: {
        category: true
      }
    })
  }

  findByID(id: number) {
    return this.roomRepository.findOne({
      where: {
        id
      },
      relations: {
        category: true
      }
    })
  }

  update(id: number, data: RoomUpdateDto) {
    const save = {
      ...data,
      category: {
        id: data.categoryId
      }
    }
    delete save.categoryId
    return this.roomRepository.update(id, save)
  }

  remove(id: number) {
    return this.roomRepository.delete(id)
  }

  count(): Promise<number> {
    return this.roomRepository.count()
  }
}
