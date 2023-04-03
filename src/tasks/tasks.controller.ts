import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('/find/:value')
  findOne(@Param('value') value: string) {
    return this.tasksService.findOne(value);
  }

  @Get('/category/:value')
  findCategory(@Param('value') value: string)
  {
    return this.tasksService.findCategory(value);
  }

  @Patch('/update/:value')
  update(@Param('value') value: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(value, updateTaskDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
