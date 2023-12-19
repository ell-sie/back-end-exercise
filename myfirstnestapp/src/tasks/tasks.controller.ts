import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from 'src/entitites/task.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/dtos/createtaskdto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The category has been successfully created.'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  @ApiResponse({ status: 404, description: 'Category not found'})
    @ApiBody({
       type: CreateTaskDto,
       description: 'Json structure for user object',
    })
  async createTask(@Body() body: CreateTaskDto): Promise<Task> {
    const { title, description, categoryId } = body;
    console.log('----', body);

    return this.taskService.createTask(title, description, categoryId);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The task has been deleted successfully'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
