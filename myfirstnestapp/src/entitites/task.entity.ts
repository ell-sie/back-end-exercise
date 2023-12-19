import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @ApiProperty({
    example: '4dfd38d0-569e-4115-909d-6aacabc02522',
    required: true
 })

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({
    example: 'Assignments to do',
    required: true
 })
  @Column()
  title: string;

  @ApiProperty({
    example: 'OPEN' || 'IN_PROGRESS' || 'DONE',
    required: true
 })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @ApiProperty({
    example: 'The Assignments to finish this week',
    required: true
 })
  @Column()
  description: string;

  @ApiProperty({
    example: '12303',
    required: true
 })
  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}

