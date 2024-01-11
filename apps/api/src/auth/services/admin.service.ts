
// import { Injectable } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { InjectRepository } from '@nestjs/typeorm'
// import { compare } from 'bcrypt'
// import { Repository } from 'typeorm'
// import { Admin } from '../../admin/entities/admin.entity'


// @Injectable()
// export class AdminAuthService {
//   constructor(
//     @InjectRepository(Admin)
//     private adminRepository: Repository<Admin>,
//     private readonly jwtService: JwtService
//   ) {}

//   async validateUser(auth: AuthDTO): Promise<IAuthResponse> {
//     const admin = await this.adminRepository.findOne({
//       where: {
//         username: auth.username
//       }
//     })
//     if (!admin) throw new Error('User not found.')

//     const match = await compare(auth.password, admin.password)
//     if (!match) throw new Error('Password incorrect')

//     if (admin && match) {
//       const payload = { username: admin.username, sub: admin.id }
//       const token = await this.jwtService.signAsync(payload)

//       const data: IAdminInfo = {
//         id: admin.id,
//         username: admin.username,
//         email: admin.email,
//         firstName: admin.firstName,
//         lastName: admin.lastName
//       }

//       return {
//         user: data,
//         accessToken: token,
//         refreshToken: ''
//       }
//     }
//   }

//   async login(user: Admin) {
//     const payload = { username: user.username, sub: user.id }
//     return {
//       access_token: this.jwtService.sign(payload)
//     }
//   }


// }
