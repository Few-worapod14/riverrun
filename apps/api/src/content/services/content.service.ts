import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Content } from '../entities/content.entity'

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentService: Repository<Content>
  ) {}
}
