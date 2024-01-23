import { IsEmail, IsString } from 'class-validator'

export interface IAuthCustomerRequest {
  email: string
  password: string
}

export interface IAutCustomerResponse {
  user: ICustomerInfo
  accessToken: string
}

export interface ICustomerInfo {
  id: number
  email: string
  mobile: string
  firstName: string
  lastName: string
}

export interface ICustomerPayload {
  sub: number
  email: string
}

export class CustomerSignIn {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
