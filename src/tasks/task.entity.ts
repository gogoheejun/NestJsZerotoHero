import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(_type=>User, user=>user.tasks, {eager:false})
  @Exclude({toPlainOnly:true})
  user:User;
}