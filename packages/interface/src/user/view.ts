import { USER_ROLE } from '../constant'

export class UserDto {
  id: number

  email: string

  mobile: string

  firstName: string

  lastName: string

  role: USER_ROLE

  createdAt: Date

  updatedAt: Date
}
