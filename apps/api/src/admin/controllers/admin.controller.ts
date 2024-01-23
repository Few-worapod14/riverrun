import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import {
  AdminCreateDto,
  AdminUpdateDto,
  IResponseData,
  IResponsePaginate
} from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { IRequestWithAdmin } from '../../auth/requet.interface'
import { Admin } from '../entities/admin.entity'
import { AdminService } from '../services/admin.service'

@UseGuards(AdminGuard)
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/')
  async create(@Req() req: IRequestWithAdmin, @Res() res: Response, @Body() body: AdminCreateDto) {
    const query = await this.adminService.create(body)
    const response: IResponseData<Admin> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Get('/')
  async findAll(
    @Req() req: IRequestWithAdmin,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const currentPage = page || 1
    const perPage = limit || 10
    const query = await this.adminService.findAll(currentPage, perPage)
    const total = await this.adminService.count()
    const response: IResponsePaginate<Admin[]> = {
      success: true,
      total: total,
      currentPage: currentPage,
      perPage: perPage,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Get(':id')
  async findByID(
    @Req() req: IRequestWithAdmin,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number
  ) {
    const query = await this.adminService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<Admin> = {
      data: query,
      success: true
    }

    res.status(HttpStatus.OK).json(response)
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AdminUpdateDto
  ) {
    const query = await this.adminService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.adminService.update(id, body)
    const adminData = await this.adminService.findByID(id)
    const response: IResponseData<Admin> = {
      data: adminData,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.adminService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.adminService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
