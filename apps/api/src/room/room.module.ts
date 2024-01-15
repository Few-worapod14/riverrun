import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { RoomAdminController } from './controllers/admin.controller'
import { RoomController } from './controllers/room.controller'
import { Room } from './entities/room.entity'
import { RoomService } from './services/room.service'

@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule],
  controllers: [RoomAdminController, RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
