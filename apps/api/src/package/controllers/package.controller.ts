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
  PackageCreateDto,
  PackageDto,
  PackageUpdateDto
} from '@riverrun/interface'
import { Request, Response } from 'express'
import { AdminGuard } from '../../auth/guards/admin.guard'
import { PackageService } from '../services/package.service'

@UseGuards(AdminGuard)
@Controller('admins/packages')
export class AdminPackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() body: PackageCreateDto) {
    try {
      const query = await this.packageService.create(body)
      const response: IResponseData<PackageDto> = {
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
    const perPage = limit || 20
    const query = await this.packageService.findAll(currentPage, perPage)
    const total = await this.packageService.count()
    const response: IResponsePaginate<PackageDto[]> = {
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
    const query = await this.packageService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    const response: IResponseData<PackageDto> = {
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
    @Body() body: PackageUpdateDto
  ) {
    const query = await this.packageService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.packageService.update(id, body)
    await this.packageService.findByID(id)
    const response: IResponseData<PackageDto> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const query = await this.packageService.findByID(id)
    if (!query) {
      throw new NotFoundException('id not found')
    }
    await this.packageService.remove(id)
    const response: IResponseData<string> = {
      message: 'Delete successfully',
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }
}
