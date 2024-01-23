import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from '../admin/entities/admin.entity'
import { Customer } from '../customer/entities/customer.entity'
import { jwtConstants } from './constants'
import { AuthController } from './controllers/auth.controller'
import { AdminService } from './services/admin.service'
import { CustomerService } from './services/customer.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Admin]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expired }
    })
  ],
  controllers: [AuthController],
  providers: [CustomerService, AdminService],
  exports: [CustomerService, AdminService]
})
export class AuthModule {}
