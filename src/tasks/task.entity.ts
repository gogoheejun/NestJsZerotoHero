import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task{
  @PrimaryGeneratedColumn('uuid')//uuid안하면 기본으론 123순서임
  id: string;

  @Column()
  title:string;

  @Column()
  description:string;

  @Column()
  status:TaskStatus;
}