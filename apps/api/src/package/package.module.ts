import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { AdminPackageController } from './controllers/admin-package.controller'
import { Package } from './entities/package.entity'
import { PackageService } from './services/package.service'

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Package])],
  controllers: [AdminPackageController],
  providers: [PackageService],
  exports: [PackageService]
})
export class PackageModule {}
