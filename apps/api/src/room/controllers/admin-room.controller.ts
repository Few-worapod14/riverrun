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
  UploadedFiles,
  UseGuards
} from '@nestjs/common'
import { IResponseData, IResponsePaginate, RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { Room } from '../entities/room.entity'
import { RoomService } from '../services/room.service'

@UseGuards(AdminGuard)
@Controller('admins/rooms')
export class RoomAdminController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: RoomCreateDto
  ) {
    try {
      const query = await this.roomService.create(body)
      const response: IResponseData<Room> = {
        data: query,
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
    const query = await this.roomService.findAll(currentPage, perPage)
    const total = await this.roomService.count()
    const response: IResponsePaginate<Room[]> = {
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
    const query = await this.roomService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<Room> = {
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
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: RoomUpdateDto
  ) {
    const query = await this.roomService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.roomService.update(id, body)
    await this.roomService.findByID(id)
    const response: IResponseData<Room> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.roomService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.roomService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
