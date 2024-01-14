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
import { ResponseData, UserCreateDto, UserUpdateDto } from '@riverrun/interface'
import { Response } from 'express'

import { AuthGuard } from '../../auth/guards/auth.guard'
import { UserService } from '../services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response, @Body() body: UserCreateDto) {
    try {
      const checkEmail = await this.userService.findByEmail(body.email)
      if (checkEmail) {
        const message = {
          message: 'email is exits'
        }
        throw new HttpException(message, HttpStatus.BAD_REQUEST)
      }
      const query = await this.userService.create(body)
      const response = query
      res.status(HttpStatus.CREATED).json(response)
    } catch (error) {
      throw new HttpException(
        {
          error: error
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error
        }
      )
    }
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async findMe(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = 1 //req.user.id
      const query = await this.userService.findByID(userId)
      const response = new ResponseData(true, query)
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      throw new HttpException(
        {
          error: 'Get me user error'
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error
        }
      )
    }
  }

  @UseGuards(AuthGuard)
  @Put('/me')
  updateMe(@Req() req: Request, @Res() res: Response, @Body() body: UserUpdateDto) {
    try {
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Update user error'
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error
        }
      )
    }
  }
}
