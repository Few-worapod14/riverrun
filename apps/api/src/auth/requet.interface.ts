import { IPayload } from '@riverrun/interface'
import { Request } from 'express'

export interface IRequestWithUser extends Request {
  user: IPayload
}
