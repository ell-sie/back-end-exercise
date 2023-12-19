import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<any[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<any> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() body: any): Promise<any> {
    const { title, description, categoryId } = body;
    return this.taskService.createTask(title, description, categoryId);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
}

