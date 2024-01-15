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
import { IResponseData, UserCreateDto, UserUpdateDto } from '@riverrun/interface'
import { Response } from 'express'

import { AuthGuard } from '../../auth/guards/auth.guard'
import { IRequestWithUser } from '../../auth/requet.interface'
import { User } from '../entities/user.entity'
import { UserService } from '../services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response, @Body() body: UserCreateDto) {
    try {
      const checkEmail = await this.userService.findByCriteria({
        email: body.email
      })
      if (checkEmail) {
        const message = {
          message: 'email is exits'
        }
        throw new HttpException(message, HttpStatus.BAD_REQUEST)
      }

      const checkMobile = await this.userService.findByCriteria({
        mobile: body.mobile
      })
      if (checkMobile) {
        const message = {
          message: 'mobile is exits'
        }
        throw new HttpException(message, HttpStatus.BAD_REQUEST)
      }

      await this.userService.create(body)
      const response: IResponseData<string> = {
        message: 'Create user success',
        success: true
      }
      res.status(HttpStatus.CREATED).json(response)
    } catch (error) {
      const msg: IResponseData<string> = {
        message: error?.message,
        success: false
      }
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async findMe(@Req() req: IRequestWithUser, @Res() res: Response) {
    try {
      const userId = req.user.sub
      const query = await this.userService.findByID(userId)
      const response: IResponseData<User> = {
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

  @UseGuards(AuthGuard)
  @Put('/me')
  async updateMe(@Req() req: IRequestWithUser, @Res() res: Response, @Body() body: UserUpdateDto) {
    try {
      const userId = req.user.sub
      const checkEmail = await this.userService.findByCriteria(
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

      const checkMobile = await this.userService.findByCriteria(
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

      await this.userService.update(userId, body)
      const response: IResponseData<string> = {
        success: true,
        message: 'Update user success'
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
}
