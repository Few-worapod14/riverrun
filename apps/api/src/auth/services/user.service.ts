import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { IAuthUserRequest, IAutUserResponse, IPayload } from '@riverrun/interface'
import { compare } from 'bcrypt'
import { IsNull, Repository } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(auth: IAuthUserRequest): Promise<IAutUserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: auth.email,
        deletedAt: IsNull()
      },
      select: ['id', 'email', 'password', 'firstName', 'lastName']
    })
    if (!user) throw new Error('User not found.')

    const match = await compare(auth.password, user.password)

    if (!match) throw new Error('Password incorrect')

    if (user && match) {
      const payload: IPayload = { email: user.email, sub: user.id }
      const token = await this.jwtService.signAsync(payload)

      const res: IAutUserResponse = {
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
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }
}
