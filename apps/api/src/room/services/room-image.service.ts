import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { Repository } from 'typeorm'
import { RoomImage } from '../entities/room-image.entity'

@Injectable()
export class RoomImageService {
  constructor(
    @InjectRepository(RoomImage)
    private roomImageRepository: Repository<RoomImage>
  ) {}

  findById(id: number) {
    return this.roomImageRepository.findOne({
      where: { id }
    })
  }

  async remove(id: number) {
    const image = await this.findById(id)
    if (fs.existsSync(image?.path)) {
      fs.unlinkSync(image?.path)
      this.roomImageRepository.delete(id)
    }
  }
}
