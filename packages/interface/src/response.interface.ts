export interface IResponsePaginate {
  success: boolean
  data: any
  currentPage: number
  perPage: number
  total: number
}

export class ResponsePaginate<T> {
  success: boolean
  data?: T
  currentPage?: number
  perPage?: number
  total?: number

  constructor(success = true, data?: T, currentPage?: number, perPage?: number, total?: number) {
    this.success = success
    this.data = data
    this.currentPage = Number(currentPage)
    this.perPage = Number(perPage)
    this.total = Number(total)
  }
}

export interface IResponseData {
  success: boolean
  data?: any
  message?: string | null
}

export class ResponseData<T> {
  success: boolean
  data?: T
  message?: string | null

  constructor(success = true, data?: T, message?: string) {
    this.success = success
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
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
