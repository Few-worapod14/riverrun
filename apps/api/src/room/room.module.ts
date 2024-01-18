import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { AuthModule } from '../auth/auth.module'
import { RoomAdminController } from './controllers/admin.controller'
import { RoomController } from './controllers/public.controller'
import { Room } from './entities/room.entity'
import { RoomService } from './services/room.service'

@Module({
  imports: [
    MulterModule.register({
      dest: './_uploads',
      storage: diskStorage({
        destination: './_uploads',
        filename: (req, file, callback) => {
          const timestamp = Date.now()
          const randomString = Math.random().toString(36).substring(7)
          const uniqueSuffix = `${timestamp}-${randomString}`
          callback(null, `${uniqueSuffix}-${file.originalname}`)
        }
      })
    }),
    TypeOrmModule.forFeature([Room]),
    AuthModule
  ],
  controllers: [RoomAdminController, RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
