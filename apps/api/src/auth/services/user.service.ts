import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { IAuthUserRequest, IAutUserResponse } from '@riverrun/interface'
import { compare } from 'bcrypt'
import { Repository } from 'typeorm'
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
        isActive: true
      },
      select: ['id', 'email', 'password', 'firstName', 'lastName']
    })
    if (!user) throw new Error('User not found.')

    const match = await compare(auth.password, user.password)
    console.log('match', match)
    if (!match) throw new Error('Password incorrect')

    if (user && match) {
      const payload = { email: user.email, sub: user.id }
      const token = await this.jwtService.signAsync(payload)

      const res = {
        user: {
          id: user.id,
          email: user?.email,
          mobile: user?.mobile,
          firstName: user.firstName,
          lastName: user.lastName
        },
        accessToken: token,
      }
      return res
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
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
