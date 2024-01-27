import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { IAutCustomerResponse, IAuthCustomerRequest, ICustomerPayload } from '@riverrun/interface'
import { compare } from 'bcrypt'
import { IsNull, Repository } from 'typeorm'
import { Customer } from '../../customer/entities/customer.entity'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(auth: IAuthCustomerRequest): Promise<IAutCustomerResponse> {
    const user = await this.customerRepository.findOne({
      where: {
        email: auth.email,
        deletedAt: IsNull()
      },
      select: ['id', 'email', 'password', 'firstName', 'lastName']
    })
    if (!user) throw new Error('User not found.')

    const match = await compare(auth.password, user.password)

    if (!match) throw new Error('Password incorrect.')

    if (user && match) {
      const payload: ICustomerPayload = { email: user.email, sub: user.id }
      const token = await this.jwtService.signAsync(payload)

      const res: IAutCustomerResponse = {
        user: {
          id: user.id,
          email: user?.email,
          mobile: user?.mobile,
          firstName: user.firstName,
          lastName: user.lastName
        },
        accessToken: token
      }
      return res
    }
  }

  async findById(id: number) {
    return this.customerRepository.findOne({
      where: {
        id
      }
    })
  }
}
