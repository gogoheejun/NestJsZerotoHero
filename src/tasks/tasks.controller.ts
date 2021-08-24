import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService){}

  //http://localhost:3000/tasks
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto):Promise<Task[]>{
    //if we have any filters defined, call tasksService.getTasksWithFilters
    //otherwise, just get all tasks
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string):Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() CreateTaskDto:CreateTaskDto,
    @GetUser() user:User,
    ):Promise<Task>{ //Body를 CreateTaskDto에다가 담음
    return this.tasksService.createTask(CreateTaskDto,user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string):Promise<void>{
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id:string,
    @Body() updateTaskStatus:UpdateTaskStatusDto,
  ):Promise<Task>{
    const {status} = updateTaskStatus
    return this.tasksService.updateTaskStatus(id,status);
  }

}
