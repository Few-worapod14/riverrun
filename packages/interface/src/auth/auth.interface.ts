export interface IAuthUserRequest {
  email: string
  password: string
}

export interface IAutUserResponse {
  user: IUserInfo
  accessToken: string
}

export interface IUserInfo {
  id: number
  email: string
  mobile: string
  firstName: string
  lastName: string
}

export interface IPayload {
  sub: number
  email: string
}
