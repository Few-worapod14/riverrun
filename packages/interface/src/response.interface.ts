export interface IResponsePaginate<T> {
  success: boolean
  data: T
  currentPage: number
  perPage: number
  total: number
}

export interface IResponseData<T> {
  success: boolean
  data?: T | null
  message?: T | null
}

export interface IErrorMessage {
  field?: string
  message: string[]
}

export interface ErrorDto {
  success: boolean
  errors: IErrorMessage[]
}

export class ErrorResponse {
  success: boolean
  errors: IErrorMessage[]

  constructor(success = false, errors: IErrorMessage[]) {
    this.success = success
    this.errors = errors
  }
}
