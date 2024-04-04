import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { AuthModule } from '../auth/auth.module'
import { AdminPaymentController } from './controllers/admin.controller'
import { PaymentController } from './controllers/public.controller'
import { Payment } from './entities/payment.entity'
import { PaymentService } from './services/payment.service'

@Module({
  imports: [
    JwtModule,
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
    TypeOrmModule.forFeature([Payment]),
    AuthModule
  ],
  controllers: [AdminPaymentController, PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
