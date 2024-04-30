import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'

import { Repository } from 'typeorm'
import { RoomImage } from '../entities/room-image.entity'
import { Room } from '../entities/room.entity'

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RoomImage)
    private roomImageRepository: Repository<RoomImage>
  ) {}

  async create(data: RoomCreateDto, files?: Array<Express.Multer.File>) {
    const save = {
      ...data,
      category: {
        id: data.categoryId
      }
    }
    delete save.categoryId
    const room = await this.roomRepository.save(save)

    files?.forEach(async (file) => {
      const fullPath = process.env.FILE_PATH + '/' + file.path

      const image = {
        fileName: file.filename,
        path: file.path,
        fullPath: fullPath
      }
      await this.roomImageRepository.save(image)
    })

    return room
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.roomRepository.find({
      skip: skip,
      take: limit,
      relations: {
        category: true,
        images: true
      }
    })
  }

  findByID(id: number) {
    return this.roomRepository.findOne({
      where: {
        id
      },
      relations: {
        category: true,
        images: true
      }
    })
  }

  async update(id: number, data: RoomUpdateDto, files?: Array<Express.Multer.File>) {
    const save = {
      ...data,
      id: id,
      category: {
        id: data.categoryId
      }
    }
    delete save.categoryId

    const room = await this.roomRepository.findOne({ where: { id: id } })

    files?.forEach(async (file) => {
      const fullPath = process.env.FILE_PATH + '/' + file.path

      const image = {
        room: room,
        fileName: file.filename,
        path: file.path,
        fullPath: fullPath
      }
      await this.roomImageRepository.save(image)
    })

    return this.roomRepository.save(save)
  }

  remove(id: number) {
    return this.roomRepository.delete(id)
  }

  count(): Promise<number> {
    return this.roomRepository.count()
  }

  getRoomHomePage() {
    return this.roomRepository.query(`SELECT * FROM your_entity_table ORDER BY RANDOM() LIMIT 10`)
  }
}
