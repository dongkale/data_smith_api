import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartController } from './part.controller';
import { PartService } from './part.service';
import { Part } from './part.entity';
import { PartSubscriber } from 'src/part/part.subscribe';

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  controllers: [PartController],
  providers: [PartService, PartSubscriber],
})
export class PartModule {}
