import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common'

import { CustomerSignIn } from '@riverrun/interface'
import { Response } from 'express'
import { AdminService } from '../services/admin.service'
import { CustomerService } from '../services/customer.service'

@Controller('auth')
export class AuthController {
  constructor(
    private customerService: CustomerService,
    private adminService: AdminService
  ) {}

  @Post('users')
  async userSignIn(@Res() res: Response, @Body() body: CustomerSignIn) {
    const validate = await this.customerService.validateUser(body)
    if (!validate) {
      throw new HttpException(
        {
          message: 'Email or password not match.',
          success: false
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    res.status(HttpStatus.OK).json(validate)
  }

  @Post('admins')
  async adminSignIn(@Res() res: Response, @Body() body: CustomerSignIn) {
    const validate = await this.adminService.validateUser(body)
    if (!validate) {
      throw new HttpException(
        {
          message: 'Username or password not match.',
          success: false
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    res.status(HttpStatus.OK).json(validate)
  }
}
