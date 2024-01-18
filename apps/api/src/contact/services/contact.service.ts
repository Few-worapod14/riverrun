import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ContactCreateDto, ContactUpdateDto } from '@riverrun/interface'
import { Repository } from 'typeorm'
import { Contact } from '../entities/contact.entity'

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactService: Repository<Contact>
  ) {}

  create(data: ContactCreateDto) {
    return this.contactService.save({
      ...data,
      resolve: false
    })
  }

  findAll(page: number, limit: number) {
    const skip: number = page == 1 ? 0 : limit * (page - 1)
    return this.contactService.find({
      skip: skip,
      take: limit
    })
  }

  findByID(id: number) {
    return this.contactService.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, data: ContactUpdateDto) {
    return this.contactService.update(id, data)
  }

  remove(id: number) {
    return this.contactService.delete(id)
  }

  count() {
    return this.contactService.count()
  }
}
