import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  // //http://localhost:3000/tasks
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto):Task[]{
  //   //if we have any filters defined, call tasksService.getTasksWithFilters
  //   //otherwise, just get all tasks
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }else{
  //     return this.tasksService.getAllTasks();
  //   }

  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id:string):Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto:CreateTaskDto):Promise<Task>{ //Body를 CreateTaskDto에다가 담음
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string):Promise<void>{
    return this.tasksService.deleteTask(id);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id:string,
  //   @Body() updateTaskStatus:UpdateTaskStatusDto,
  // ):Task{
  //   const {status} = updateTaskStatus
  //   return this.tasksService.updateTaskStatus(id,status);
  // }

}
