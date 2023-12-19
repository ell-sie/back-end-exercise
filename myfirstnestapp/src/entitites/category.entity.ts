import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({
    example: '89bc9512-5d34-4b72-a106-ae4ac2d41be7',
    description: 'category id'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: `Elsie's category`,
    description: 'category name'
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Task in the category',
    description: 'tasks category'
  })
  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
