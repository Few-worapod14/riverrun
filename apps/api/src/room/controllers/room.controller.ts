import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
  Req,
  Res
} from '@nestjs/common'
import { IResponseData, IResponsePaginate } from '@riverrun/interface'
import { Response } from 'express'
import { Room } from '../entities/room.entity'
import { RoomService } from '../services/room.service'

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    const currentPage = page || 1
    const perPage = limit || 20
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
  async findByID(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
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

  @Get('/home')
  async getRoomForHomePage(@Res() res: Response) {
    const query = await this.roomService.getRoomHomePage()
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<Room> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
