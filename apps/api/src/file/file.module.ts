import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entity'
import { FileService } from './services/file.service'

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
