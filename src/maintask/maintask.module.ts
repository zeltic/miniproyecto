import { Module } from '@nestjs/common';
import { MaintaskService } from './maintask.service';
import { MaintaskController } from './maintask.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maintask, MaintaskSchema } from './entities/maintask.entity';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  controllers: [MaintaskController],
  providers: [MaintaskService],
  imports: [
    TasksModule,
    MongooseModule.forFeature([
      {
        name: Maintask.name,
        schema: MaintaskSchema,
      }
    ]),
  ]
})
export class MaintaskModule {}
