import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[]{
    return this.tasks;
  }

  getTaskById(id:string): Task{
    return this.tasks.find((task)=>task.id === id);
  }

  createTask(createTaskDto:CreateTaskDto):Task {
    const{title,description} = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    //만들었으니 기존 배열에 넣기
    this.tasks.push(task);
    return task;
  }

  deleteById(id:string){
    this.tasks = this.tasks.filter((task)=>task.id !==id);
  }
}
