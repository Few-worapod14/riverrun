import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { ContactAdminController } from './controllers/admin.controller'
import { ContactController } from './controllers/public.controller'
import { Contact } from './entities/contact.entity'
import { ContactService } from './services/contact.service'

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Contact]), AuthModule],
  controllers: [ContactAdminController, ContactController],
  providers: [ContactService],
  exports: [ContactService]
})
export class ContactModule {}
