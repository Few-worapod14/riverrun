import { IsEmail, IsString } from 'class-validator'

export interface IAuthAdminRequest {
  email: string
  password: string
}

export interface IAutAdminResponse {
  user: IAdminInfo
  accessToken: string
}

export interface IAdminInfo {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface IAdminPayload {
  sub: number
  username: string
}

export class AdminSignIn {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
