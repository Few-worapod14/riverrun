import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookingAdminController } from './controllers/admin.controller'
import { BookingController } from './controllers/booking.controller'
import { Booking } from './entities/booking.entity'
import { BookingService } from './services/booking.service'

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingAdminController, BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
