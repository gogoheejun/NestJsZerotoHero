import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  //http://localhost:3000/tasks
  @Get()
  getAllTasks():Task[]{
    return this.tasksService.getAllTasks();
  }

  //http://localhost:3000/tasks/alex
  @Get('/:id')
  getTaskById(@Param('id') id: string):Task{ //파라미터를 id에다가 담음
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto:CreateTaskDto):Task{ //Body를 CreateTaskDto에다가 담음
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string):void{
    return this.tasksService.deleteById(id);
  }


}
