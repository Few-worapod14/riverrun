import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { IResponseData, IResponsePaginate, RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { RoomService } from '../services/room.service'

@UseGuards(AdminGuard)
@Controller('admins/rooms')
export class RoomAdminController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() body: RoomCreateDto) {
    try {
      const query = await this.roomService.create(body)
      const response: IResponseData = {
        data: query,
        success: true
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData = {
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
    try {
      const currentPage = page || 1
      const perPage = limit || 10
      const query = await this.roomService.findAll(currentPage, perPage)
      const total = await this.roomService.count()
      const response: IResponsePaginate = {
        success: true,
        total: total,
        currentPage: currentPage,
        perPage: perPage,
        data: query
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const message = {
        message: error.message
      }
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  async findByID(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const query = await this.roomService.findByID(id)
      const response: IResponseData = {
        data: query,
        success: true
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData = {
        message: error?.message,
        success: false
      }
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RoomUpdateDto
  ) {
    try {
      await this.roomService.update(id, body)
      const query = await this.roomService.findByID(id)
      const response: IResponseData = {
        data: query,
        success: true
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData = {
        message: error?.message,
        success: false
      }
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.roomService.remove(id)
      const response: IResponseData = {
        message: 'Delete successfully',
        success: true
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      const msg: IResponseData = {
        message: error?.message,
        success: false
      }
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }
}
