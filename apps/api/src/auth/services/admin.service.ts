import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { IAdminPayload, IAutAdminResponse, IAuthAdminRequest } from '@riverrun/interface'
import { compare } from 'bcrypt'
import { Repository } from 'typeorm'
import { Admin } from '../../admin/entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(auth: IAuthAdminRequest): Promise<IAutAdminResponse> {
    const user = await this.adminRepository.findOne({
      where: {
        email: auth.email
      },
      select: ['id', 'username', 'email', 'password', 'firstName', 'lastName']
    })
    if (!user) throw new Error('Admin not found.')

    const match = await compare(auth.password, user.password)

    if (!match) throw new Error('Password incorrect.')

    if (user && match) {
      const payload: IAdminPayload = { username: user.username, sub: user.id }
      const token = await this.jwtService.signAsync(payload)

      const res: IAutAdminResponse = {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        },
        accessToken: token
      }
      return res
    }
  }

  async findById(id: number) {
    return this.adminRepository.findOne({
      where: {
        id
      }
    })
  }

  async findByAuth(id: number, username: string) {
    return this.adminRepository.findOne({
      where: {
        id: id,
        username: username
      }
    })
  }
}
