import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'

import { CustomerSignIn, ERROR_MSG_TYPE, IErrorDto } from '@riverrun/interface'
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
      const errors: IErrorDto = {
        message: [
          {
            property: ERROR_MSG_TYPE.SYSTEM,
            message: 'Email or password not match.'
          }
        ],
        success: false
      }

      return res.status(HttpStatus.UNAUTHORIZED).json(errors)
    }

    return res.status(HttpStatus.OK).json({
      data: validate,
      success: true
    })
  }

  @Post('admins')
  async adminSignIn(@Res() res: Response, @Body() body: CustomerSignIn) {
    const validate = await this.adminService.validateUser(body)
    if (!validate) {
      const errors: IErrorDto = {
        message: [
          {
            property: ERROR_MSG_TYPE.SYSTEM,
            message: 'Username or password not match.'
          }
        ],
        success: false
      }

      return res.status(HttpStatus.UNAUTHORIZED).json(errors)
    }

    return res.status(HttpStatus.OK).json({
      data: validate,
      success: true
    })
  }
}
