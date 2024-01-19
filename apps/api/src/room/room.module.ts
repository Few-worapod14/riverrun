import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { AuthModule } from '../auth/auth.module'
import { RoomCategoryAdminController } from './controllers/admin-room-category.controller'
import { RoomAdminController } from './controllers/admin-room.controller'
import { RoomController } from './controllers/public.controller'
import { RoomCategory } from './entities/category-room.entity'
import { Room } from './entities/room.entity'
import { RoomCategoryService } from './services/room-category.service'
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
    TypeOrmModule.forFeature([RoomCategory, Room]),
    AuthModule
  ],
  controllers: [RoomCategoryAdminController, RoomAdminController, RoomController],
  providers: [RoomCategoryService, RoomService],
  exports: [RoomCategoryService, RoomService]
})
export class RoomModule {}
