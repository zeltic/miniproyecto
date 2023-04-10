import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CommonModule } from './common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintaskModule } from './maintask/maintask.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-miniproyecto'),
    TasksModule,
    CommonModule,
    MaintaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
