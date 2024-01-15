import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
  Res
} from '@nestjs/common'
import { IResponseData } from '@riverrun/interface'
import { Response } from 'express'
import { RoomService } from '../services/room.service'

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

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
}
