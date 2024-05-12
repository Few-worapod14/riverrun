import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { AdminController } from './controllers/admin.controller'
import { Admin } from './entities/admin.entity'
import { AdminService } from './services/admin.service'

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule, AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
