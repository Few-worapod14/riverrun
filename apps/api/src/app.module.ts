import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { BookingModule } from './booking/booking.module'
import { ContactModule } from './contact/contact.module'
import { RoomModule } from './room/room.module'
import { UserModule } from './user/user.module'
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
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'assets'),
      serveRoot: '/assets/',
      exclude: ['/api/(.*)']
    }),
    UserModule,
    AuthModule,
    RoomModule,
    BookingModule,
    ContactModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
