import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common'
import { UserSignIn } from '@riverrun/interface'
import { Response } from 'express'
import { UserService } from '../services/user.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('user')
  async userSignIn(@Res() res: Response, @Body() body: UserSignIn) {
    try {
      const validate = await this.authService.validateUser(body)
      if (!validate) {
        throw Error('Email or password not match.')
      }

      res.status(HttpStatus.OK).json(validate)
    } catch (error) {
      throw new HttpException(
        {
          message: error,
          success: false
        },
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  async adminSignIn() {}
}
