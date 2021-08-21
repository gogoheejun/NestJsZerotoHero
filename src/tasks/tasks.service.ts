import { Injectable, NotFoundException } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[]{
    return this.tasks;
  }

  getTasksWithFilters(filterDto:GetTasksFilterDto): Task[]{
    const{status, search} = filterDto;

    //define a temporary array to hold the result
    let tasks = this.getAllTasks();

    //do sth with status
    if(status){
      tasks = tasks.filter((task)=>task.status === status);
    }

    //do sth with search
    if(search){
      tasks = tasks.filter((tasks)=>{
        if(tasks.title.includes(search)|| tasks.description.includes(search)){
          return true;
        }
        return false;
      })
    }

    //return final result
    return tasks;
  }

  getTaskById(id:string): Task{
    const found = this.tasks.find((task)=>task.id === id);

    if(!found){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
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

  deleteTask(id:string){
    const found = this.getTaskById(id); //벨리데이션
    this.tasks = this.tasks.filter((task)=>task.id !== found.id);
  }

  updateTaskStatus(id:string, status:TaskStatus){
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
