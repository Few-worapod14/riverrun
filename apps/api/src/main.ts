import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { IErrorMessage } from '@riverrun/interface'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result: IErrorMessage[] = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]]
        }))
        return new BadRequestException(result)
      },
      stopAtFirstError: true
    })
  )
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  app.setGlobalPrefix(process.env.API_PREFIX)
  const config = new DocumentBuilder()
    .setTitle('Api')
    .setDescription('TAPI description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(3001)
}
bootstrap()
