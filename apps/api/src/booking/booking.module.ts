import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomModule } from 'src/room/room.module'
import { AuthModule } from '../auth/auth.module'
import { Room } from '../room/entities/room.entity'
import { BookingAdminController } from './controllers/admin.controller'
import { BookingController } from './controllers/booking.controller'
import { Booking } from './entities/booking.entity'
import { BookingService } from './services/booking.service'

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room]), AuthModule, RoomModule],
  controllers: [BookingAdminController, BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
