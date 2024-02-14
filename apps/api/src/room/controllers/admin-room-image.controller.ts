import {
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { IResponseData } from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { RoomImageService } from '../services/room-image.service'

@UseGuards(AdminGuard)
@Controller('admins/rooms/images')
export class AdminRoomImageController {
  constructor(private readonly roomImageService: RoomImageService) {}

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.roomImageService.findById(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.roomImageService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete image successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
