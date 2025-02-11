import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { ContactUpdateDto, IResponseData, IResponsePaginate } from '@riverrun/interface'
import { Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { IRequestWithUser } from '../../auth/request.interface'
import { Contact } from '../entities/contact.entity'
import { ContactService } from '../services/contact.service'

@UseGuards(AdminGuard)
@Controller('admins/contacts')
export class ContactAdminController {
  constructor(private contactService: ContactService) {}

  @Get()
  async findAll(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const currentPage = page || 1
    const perPage = limit || 20
    const query = await this.contactService.findAll(currentPage, perPage)
    const total = await this.contactService.count()
    const response: IResponsePaginate<Contact[]> = {
      success: true,
      total: total,
      currentPage: currentPage,
      perPage: perPage,
      data: query
    }
    return res.status(HttpStatus.OK).json(response)
  }

  @Get(':id')
  async findByID(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    const query = await this.contactService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }

    const response: IResponseData<Contact> = {
      data: query,
      success: true
    }

    return res.status(HttpStatus.OK).json(response)
  }

  @Put(':id')
  async update(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ContactUpdateDto
  ) {
    const query = await this.contactService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }

    await this.contactService.update(id, body)
    const response: IResponseData<string> = {
      message: 'Update successfully',
      success: true
    }

    return res.status(HttpStatus.OK).json(response)
  }

  @Delete(':id')
  async remove(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    const query = await this.contactService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }

    await this.contactService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete successfully',
      success: true
    }

    return res.status(HttpStatus.OK).json(response)
  }
}
