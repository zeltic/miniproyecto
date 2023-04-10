import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe } from '@nestjs/common';
import { MaintaskService } from './maintask.service';
import { CreateMaintaskDto } from './dto/create-maintask.dto';
import { UpdateMaintaskDto } from './dto/update-maintask.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { ParseMongoIdArrayPipe } from 'src/common/pipes/parse-mongo-id-array/parse-mongo-id-array.pipe';

@Controller('todo')
export class MaintaskController {
  constructor(private readonly maintaskService: MaintaskService) {}

  @Post('/create')
  create(@Body() createMaintaskDto: CreateMaintaskDto) {
    return this.maintaskService.create(createMaintaskDto);
  }

  @Get()
  findAll() {
    return this.maintaskService.findAll();
  }

  @Get('/find/:value')
  findOne(@Param('value') value: string) {
    return this.maintaskService.findOne(value);
  }

  @Patch('/update/:value')
  update(@Param('value') value: string, @Body() updateMaintaskDto: UpdateMaintaskDto) {
    return this.maintaskService.update(value, updateMaintaskDto);
  }

  @Patch('/addtask/:value')
  addTask(@Param('value') value: string, @Body('task', ParseArrayPipe, ParseMongoIdArrayPipe) id: string[]) {
    return this.maintaskService.addTask(value, id);
  }

  @Delete('/remove/:id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.maintaskService.remove(id);
  }

  @Delete('/removetask/:value')
  removeTask(@Param('value') value: string, @Body('task', ParseMongoIdPipe) id: string) {
    return this.maintaskService.removeTask(value, id);
  }
}
