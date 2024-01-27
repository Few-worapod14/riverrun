import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomModule } from 'src/room/room.module'
import { AuthModule } from '../auth/auth.module'
import { Room } from '../room/entities/room.entity'
import { BookingAdminController } from './controllers/admin.controller'
import { BookingController } from './controllers/booking.controller'
import { MeController } from './controllers/me.controller'
import { Booking } from './entities/booking.entity'
import { RoomBooked } from './entities/room-booked.entity'
import { BookingService } from './services/booking.service'
import { RoomBookedService } from './services/room-booked.service'

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, RoomBooked]), AuthModule, RoomModule],
  controllers: [BookingAdminController, BookingController, MeController],
  providers: [BookingService, RoomBookedService],
  exports: [BookingService, RoomBookedService]
})
export class BookingModule {}
