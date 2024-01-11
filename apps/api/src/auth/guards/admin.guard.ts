// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { Request } from 'express'
// import { jwtConstants } from '../constants'
// import { AdminAuthService } from '../services/admin.service'

// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly authService: AdminAuthService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest()
//     const token = this.extractTokenFromHeader(request)

//     if (!token) {
//       throw new UnauthorizedException()
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: jwtConstants.secret
//       })

//       const admin = await this.authService.findById(payload.sub)
//       if (!admin) {
//         throw new UnauthorizedException()
//       }

//       request['admin'] = {
//         id: admin.id,
//         username: admin.username,
//         role: admin.role
//       }
//       return true
//     } catch {
//       throw new UnauthorizedException()
//     }
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? []
//     return type === 'Bearer' ? token : undefined
//   }
// }
