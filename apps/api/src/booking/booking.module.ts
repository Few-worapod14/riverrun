import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomModule } from 'src/room/room.module'
import { AuthModule } from '../auth/auth.module'
import { Room } from '../room/entities/room.entity'
import { BookingAdminController } from './controllers/admin.controller'
import { BookingController } from './controllers/booking.controller'
import { MeController } from './controllers/me.controller'
import { BookingSlot } from './entities/booking-slot.entity'
import { Booking } from './entities/booking.entity'
import { BookingSlotService } from './services/booing-slot.service'
import { BookingService } from './services/booking.service'

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, BookingSlot]), AuthModule, RoomModule],
  controllers: [BookingAdminController, BookingController, MeController],
  providers: [BookingService, BookingSlotService],
  exports: [BookingService, BookingSlotService]
})
export class BookingModule {}
