import { IAdminPayload, ICustomerPayload } from '@riverrun/interface'
import { Request } from 'express'

export interface IRequestWithUser extends Request {
  user: ICustomerPayload
}

export interface IRequestWithAdmin extends Request {
  user: IAdminPayload
}
