import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from 'src/entitites/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() body: any): Promise<Task> {
    const { title, description, categoryId } = body;
    console.log('----', body);

    return this.taskService.createTask(title, description, categoryId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
