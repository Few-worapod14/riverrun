import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { AuthModule } from '../auth/auth.module'
import { Package } from '../package/entities/package.entity'
import { AdminRoomCategoryController } from './controllers/admin-room-category.controller'
import { AdminRoomImageController } from './controllers/admin-room-image.controller'
import { AdminRoomController } from './controllers/admin-room.controller'
import { RoomController } from './controllers/room.controller'
import { RoomCategory } from './entities/category-room.entity'
import { RoomImage } from './entities/room-image.entity'
import { Room } from './entities/room.entity'
import { RoomCategoryService } from './services/room-category.service'
import { RoomImageService } from './services/room-image.service'
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
    TypeOrmModule.forFeature([RoomCategory, Room, RoomImage, Package]),
    AuthModule
  ],
  controllers: [
    AdminRoomCategoryController,
    AdminRoomController,
    AdminRoomImageController,
    RoomController
  ],
  providers: [RoomCategoryService, RoomService, RoomImageService],
  exports: [RoomCategoryService, RoomService, RoomImageService]
})
export class RoomModule {}
