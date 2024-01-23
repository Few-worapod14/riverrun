import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { CustomerCreateDto, CustomerUpdateDto, IResponseData } from '@riverrun/interface'
import { Response } from 'express'

import { AuthGuard } from '../../auth/guards/auth.guard'
import { IRequestWithUser } from '../../auth/requet.interface'
import { Customer } from '../entities/customer.entity'
import { CustomerService } from '../services/customer.service'

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response, @Body() body: CustomerCreateDto) {
    const checkEmail = await this.customerService.findByCriteria({
      email: body.email
    })
    if (checkEmail) {
      const message = {
        message: 'email is exits'
      }
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }

    const checkMobile = await this.customerService.findByCriteria({
      mobile: body.mobile
    })
    if (checkMobile) {
      const message = {
        message: 'mobile is exits'
      }
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }

    await this.customerService.create(body)
    const response: IResponseData<string> = {
      message: 'Create user success',
      success: true
    }
    res.status(HttpStatus.CREATED).json(response)
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async findMe(@Req() req: IRequestWithUser, @Res() res: Response) {
    const userId = req.user.sub
    const query = await this.customerService.findByID(userId)
    const response: IResponseData<Customer> = {
      data: query,
      success: true
    }
    res.status(HttpStatus.OK).json(response)
  }

  @UseGuards(AuthGuard)
  @Put('/me')
  async updateMe(
    @Req() req: IRequestWithUser,
    @Res() res: Response,
    @Body() body: CustomerUpdateDto
  ) {
    const userId = req.user.sub
    const checkEmail = await this.customerService.findByCriteria(
      {
        email: body.email
      },
      userId
    )
    if (checkEmail) {
      const message = {
        message: 'email is exits'
      }
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }

    const checkMobile = await this.customerService.findByCriteria(
      {
        mobile: body.mobile
      },
      userId
    )
    if (checkMobile) {
      const message = {
        message: 'mobile is exits'
      }
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }

    await this.customerService.update(userId, body)
    const response: IResponseData<string> = {
      success: true,
      message: 'Update user success'
    }
    res.status(HttpStatus.OK).json(response)
  }
}
