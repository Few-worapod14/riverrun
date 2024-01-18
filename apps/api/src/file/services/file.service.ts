import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { File } from '../entities/file.entity'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileService: Repository<File>
  ) {}

  create() {}

  findByID(id: number) {
    return this.fileService.findOne({
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.fileService.delete(id)
  }
}
