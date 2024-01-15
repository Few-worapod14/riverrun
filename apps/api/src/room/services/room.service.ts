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
    return this.roomRepository.save(data)
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.roomRepository.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number) {
    return this.roomRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, data: RoomUpdateDto) {
    return this.roomRepository.update(id, data)
  }

  remove(id: number) {
    return this.roomRepository.delete(id)
  }

  count(): Promise<number> {
    return this.roomRepository.count()
  }
}
