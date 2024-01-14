import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { jwtConstants } from './constants'
import { AuthController } from './controllers/auth.controller'
import { UserService } from './services/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expired }
    })
  ],
  controllers: [AuthController],
  providers: [UserService],
  exports: [UserService]
})
export class AuthModule {}
