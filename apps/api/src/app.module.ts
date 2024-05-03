import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { BookingModule } from './booking/booking.module'
import { ContactModule } from './contact/contact.module'
import { CustomerModule } from './customer/customer.module'
import { HealthModule } from './health/health.module'
import { PaymentModule } from './payment/payment.module'
import { RoomModule } from './room/room.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      logging: process.env.APP_DEV === 'develop' ? true : false,
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: process.env.FILE_UPLOAD,
      serveRoot: `/api/${process.env.FILE_UPLOAD}/`
      // exclude: ['/api/(.*)']
    }),
    HealthModule,
    AdminModule,
    CustomerModule,
    AuthModule,
    RoomModule,
    BookingModule,
    ContactModule,
    PaymentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
