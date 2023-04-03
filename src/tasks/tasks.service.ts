import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model, isValidObjectId } from 'mongoose';
import { TaskStatus } from './entities/task.status';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}
  
  async create(createTaskDto: CreateTaskDto) {
    try{
      const task: CreateTaskDto = {
        title: createTaskDto.title,
        content: createTaskDto.content,
        status: TaskStatus.OPEN
      }
      // const value = await this.taskModel.create(task);
      return await this.taskModel.create(task);;
    }
    catch (error){
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.taskModel.find();
  }

  async findOne(value: string) {
    let task: Task;
    if(isValidObjectId(value))
    {
      task = await this.taskModel.findById(value);
    }
    if(!task)
    {
      task = await this.taskModel.findOne({title: value})
    }
    if(!task)
    {
      throw new NotFoundException(`No task exists with given data`);
    }
    return task;
  }

  async findCategory(value: string)
  {
    //let task: Task;
    const task = await this.taskModel.find({status: value});
    return task;
  }

  async update(value: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(value);
    try{
      await task.updateOne(updateTaskDto);
      return {...task.toJSON(), ...updateTaskDto};
    }
    catch (error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const {deletedCount} = await this.taskModel.deleteOne({_id: id});
    if(deletedCount === 0)
    {
      throw new BadRequestException(`Task with id "${id}" not found`);
    }
    return;
  }

  private handleExceptions(error: any)
  {
    if(error.code === 11000)
      {
        throw new BadRequestException(`Task with given data already exists in DB ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create task - Check server logs`);
  }
}
