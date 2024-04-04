import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from '../admin/entities/admin.entity'
import { Customer } from '../customer/entities/customer.entity'
import { AuthController } from './controllers/auth.controller'
import { AdminService } from './services/admin.service'
import { CustomerService } from './services/customer.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Admin]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET')

        return {
          secret: secret,
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [CustomerService, AdminService],
  exports: [CustomerService, AdminService]
})
export class AuthModule {}
