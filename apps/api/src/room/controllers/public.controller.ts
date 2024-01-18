import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Req,
  Res
} from '@nestjs/common'
import { IResponseData } from '@riverrun/interface'
import { Response } from 'express'
import { Room } from '../entities/room.entity'
import { RoomService } from '../services/room.service'

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

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
}
