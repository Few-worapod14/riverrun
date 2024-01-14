import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
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
      // migrations: [__dirname + '/db/migrations/*'],
      synchronize: true
      // logging: false,
      // uuidExtension: 'uuid-ossp'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'assets'),
      serveRoot: '/assets/',
      exclude: ['/api/(.*)']
    }),
    UserModule,
    AuthModule
    // AdminModule,
    // ContentModule,
    // BookingModule,
    // SettingModule,
    // MenuModule,
    // RoomModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
