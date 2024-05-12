import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AmenityDto, AmenityListDto, RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'

import { Repository } from 'typeorm'
import { RoomAmenityList } from '../entities/room-amenity-lists.entity'
import { RoomAmenity } from '../entities/room-amenity.entity'
import { RoomImage } from '../entities/room-image.entity'
import { Room } from '../entities/room.entity'

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RoomImage)
    private roomImageRepository: Repository<RoomImage>,
    @InjectRepository(RoomAmenity)
    private roomAmenityRepository: Repository<RoomAmenity>,
    @InjectRepository(RoomAmenityList)
    private roomAmenityListRepository: Repository<RoomAmenityList>
  ) {}

  async create(data: RoomCreateDto, files?: Array<Express.Multer.File>) {
    const save = {
      category: {
        id: data.categoryId
      },
      name: data.name,
      pricePerNight: data.pricePerNight,
      amount: data.amount,
      detail: data.detail,
      isActive: data.isActive === 'true' ? true : false
    }

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
    if (data.amenities.length > 0) {
      const amenities: AmenityDto[] = JSON.parse(data.amenities)

      amenities.forEach(async (amenity: AmenityDto) => {
        const data = await this.roomAmenityRepository.save({
          name: amenity.name,
          room: {
            id: room.id
          }
        })

        amenity.lists.forEach(async (list: AmenityListDto) => {
          const add = {
            name: list.name,
            roomAmenity: {
              id: data.id
            }
          }
          await this.roomAmenityListRepository.save(add)
        })
      })
    }

    return room
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.roomRepository.find({
      skip: skip,
      take: limit,
      relations: {
        category: true,
        images: true,
        amenities: true
      },
      order: {
        id: 'asc'
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
        images: true,
        amenities: {
          lists: true
        }
      }
    })
  }

  async update(id: number, data: RoomUpdateDto, files?: Array<Express.Multer.File>) {
    const save = {
      id: id,
      category: {
        id: data.categoryId
      },
      name: data.name,
      pricePerNight: data.pricePerNight,
      amount: data.amount,
      detail: data.detail,
      isActive: data.isActive === 'true' ? true : false
    }

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

    if (data.amenities.length > 0) {
      const amenities: AmenityDto[] = JSON.parse(data.amenities)

      for (const amenity of amenities) {
        const findAmenity = await this.roomAmenityRepository.find({
          where: {
            room: {
              id
            }
          }
        })
        for (const list of findAmenity) {
          const findData = await this.roomAmenityListRepository.findOne({
            where: {
              roomAmenity: {
                id: list.id
              }
            }
          })
          if (findData) {
            await this.roomAmenityListRepository.delete(findData?.id)
            await this.roomAmenityRepository.delete(list?.id)
          }
        }

        const data = await this.roomAmenityRepository.save({
          name: amenity.name,
          room: {
            id: id
          }
        })
        amenity.lists.forEach(async (list: AmenityListDto) => {
          const add = {
            name: list.name,
            roomAmenity: {
              id: data.id
            }
          }
          await this.roomAmenityListRepository.save(add)
        })
      }
    }

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
