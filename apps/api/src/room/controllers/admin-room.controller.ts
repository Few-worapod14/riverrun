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
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { IResponseData, IResponsePaginate, RoomCreateDto, RoomUpdateDto } from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { Room } from '../entities/room.entity'
import { RoomService } from '../services/room.service'

@UseGuards(AdminGuard)
@Controller('admins/rooms')
export class AdminRoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: RoomCreateDto,
    @UploadedFiles() files?: Array<Express.Multer.File>
  ) {
    const query = await this.roomService.create(body, files)
    const room = await this.roomService.findByID(query.id)
    const response: IResponseData<Room> = {
      data: room,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

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

  @UseInterceptors(FilesInterceptor('files'))
  @Put(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RoomUpdateDto,
    @UploadedFiles() files?: Array<Express.Multer.File>
  ) {
    const check = await this.roomService.findByID(id)
    if (!check) {
      throw new NotFoundException('id not found')
    }
    await this.roomService.update(id, body, files)
    const query = await this.roomService.findByID(id)
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
