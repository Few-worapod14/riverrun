import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { ContactCreateDto, IResponseData } from '@riverrun/interface'
import { Request, Response } from 'express'
import { Contact } from '../entities/contact.entity'
import { ContactService } from '../services/contact.service'

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() body: ContactCreateDto) {
    const query = await this.contactService.create(body)
    const response: IResponseData<Contact> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
