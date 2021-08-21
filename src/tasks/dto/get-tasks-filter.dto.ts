import { TaskStatus } from '../task.model';

export class GetTasksFilterDto{
  //둘중 하나만 받을수도 있어서 ?붙임
  status?: TaskStatus;
  search?: string; 
}