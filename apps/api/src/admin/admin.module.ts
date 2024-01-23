import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminController } from './controllers/admin.controller'
import { Admin } from './entities/admin.entity'
import { AdminService } from './services/admin.service'

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
