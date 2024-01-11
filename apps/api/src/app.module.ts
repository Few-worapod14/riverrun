import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { BookingModule } from './booking/booking.module'
import { ContentModule } from './content/content.module'
import { DatabaseModule } from './database/database.module'
import { MenuModule } from './menu/menu.module'
import { RoomModule } from './room/room.module'
import { SettingModule } from './setting/setting.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/db/migrations/*'],
      synchronize: true,
      logging: false,
      uuidExtension: 'uuid-ossp'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'assets'),
      serveRoot: '/assets/',
      exclude: ['/api/(.*)']
    }),
    AdminModule,
    UserModule,
    ContentModule,
    BookingModule,
    SettingModule,
    MenuModule,
    RoomModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
