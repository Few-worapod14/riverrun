import { Controller } from '@nestjs/common'
import { BookingService } from '../services/booking.service'

@Controller('/admins/bookings')
export class BookingAdminController {
  constructor(private bookingService: BookingService) {}

  async create() {}

  async findAll() {}

  async findByID() {}

  async update() {}

  async remove() {}
}
