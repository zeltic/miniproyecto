import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMaintaskDto } from './dto/create-maintask.dto';
import { UpdateMaintaskDto } from './dto/update-maintask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Maintask } from './entities/maintask.entity';
import { Model, isValidObjectId } from 'mongoose';
import { MaintaskStatus } from './entities/maintask.status';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class MaintaskService {

  constructor(
    private readonly tasksService: TasksService,
    @InjectModel(Maintask.name)
    private readonly maintaskModel: Model<Maintask>,
  ) {}
  
  async create(createMaintaskDto: CreateMaintaskDto) {
    try{
      const maintask: CreateMaintaskDto = {
        title: createMaintaskDto.title,
        content: createMaintaskDto.content,
        status: MaintaskStatus.OPEN
      }
      // const value = await this.taskModel.create(task);
      return await this.maintaskModel.create(maintask);;
    }
    catch (error){
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.maintaskModel.find();
  }

  async findOne(value: string) {
    let maintask: Maintask;
    if(isValidObjectId(value))
    {
      maintask = await this.maintaskModel.findById(value);
    }
    if(!maintask)
    {
      maintask = await this.maintaskModel.findOne({title: value})
    }
    if(!maintask)
    {
      throw new NotFoundException(`No maintask exists with given data`);
    }
    return maintask;
  }

  async update(value: string, updateMaintaskDto: UpdateMaintaskDto) {
    const maintask = await this.findOne(value);
    try{
      await maintask.updateOne(updateMaintaskDto);
      return {...maintask.toJSON(), ...updateMaintaskDto};
    }
    catch (error){
      this.handleExceptions(error);
    }
  }

  async addTask(value: string, id: string[]) {
    const maintask = await this.findOne(value);
    try{
      for(const str of id)
      {
        let here = [];
        here.push(str);
        if(!maintask.tasks.includes(str))
        {
          await maintask.updateOne({tasks: [...maintask.tasks, ...here]});
          maintask.tasks.push(str);
        }
      }
      return {...maintask.toJSON()};
    }
    catch (error){
      this.handleExceptions(error);
    }
    throw new BadRequestException(`Maintask already has this task`);
  }

  async remove(id: string) {
    const maintask = await this.findOne(id);
    const {deletedCount} = await this.maintaskModel.deleteOne({_id: id});
    if(deletedCount === 0)
    {
      throw new BadRequestException(`Maintask with id "${id}" not found`);
    }
    while(maintask.tasks)
    {
      this.tasksService.remove(maintask.tasks.pop());
    }
    return;
  }

  async removeTask(value: string, id: string) {
    const maintask = await this.findOne(value);
    console.log(id);
    if(maintask.tasks.includes(id))
    {
      maintask.tasks = maintask.tasks.filter(task => task !== id);
      await maintask.updateOne({tasks: maintask.tasks});
      //this.tasksService.remove(id);
    }
    else
    {
      throw new BadRequestException(`Maintask does not have this task`);
    }
    return;
  }

  private handleExceptions(error: any)
  {
    if(error.code === 11000)
      {
        throw new BadRequestException(`Maintask with given data already exists in DB ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create maintask - Check server logs`);
  }
}
