import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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
  IResponseData,
  IResponsePaginate,
  RoomCategoryCreateDto,
  RoomCategoryUpdateDto
} from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { RoomCategory } from '../entities/category-room.entity'
import { RoomCategoryService } from '../services/room-category.service'

@UseGuards(AdminGuard)
@Controller('admins/rooms/categories')
export class RoomCategoryAdminController {
  constructor(private readonly categoryService: RoomCategoryService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() body: RoomCategoryCreateDto) {
    try {
      const query = await this.categoryService.create(body)
      const response: IResponseData<string> = {
        message: 'Room create successfully',
        success: true
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData<string> = {
        message: error?.message,
        success: false
      }
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const currentPage = page || 1
    const perPage = limit || 10
    const query = await this.categoryService.findAll(currentPage, perPage)
    const total = await this.categoryService.count()
    const response: IResponsePaginate<RoomCategory[]> = {
      success: true,
      total: total,
      currentPage: currentPage,
      perPage: perPage,
      data: query
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Get(':id')
  async findByID(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.categoryService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<RoomCategory> = {
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
    @Body() body: RoomCategoryUpdateDto
  ) {
    const query = await this.categoryService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.categoryService.update(id, body)
    await this.categoryService.findByID(id)
    const response: IResponseData<RoomCategory> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.categoryService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.categoryService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
