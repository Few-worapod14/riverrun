import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { AdminPaymentController } from './controllers/admin.controller'
import { PaymentController } from './controllers/public.controller'
import { Payment } from './entities/payment.entity'
import { PaymentService } from './services/payment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), AuthModule],
  controllers: [AdminPaymentController, PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
