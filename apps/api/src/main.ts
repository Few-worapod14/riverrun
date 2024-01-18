import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  app.setGlobalPrefix('api/v1')

  await app.listen(3001)
}
bootstrap()
