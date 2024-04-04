import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { AdminCustomerController } from './controllers/admin.controller'
import { CustomerController } from './controllers/customer.controller'
import { Customer } from './entities/customer.entity'
import { CustomerService } from './services/customer.service'

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Customer]), AuthModule],
  controllers: [AdminCustomerController, CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
