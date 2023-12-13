import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Task, TaskStatus } from 'src/entitites/task.entity';

@Injectable()
export class TaskService {
  private db = new JsonDB(new Config('myDatabase', true, true, '/'));

  async getAllTasks(): Promise<Task[]> {
    return this.db.getData('/tasks') || [];
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      return this.db.getData(`/tasks/${id}`);
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async createTask(title: string, description: string, categoryId: string): Promise<Task> {
    const id = uuid();
    
    try {
      const category = await this.getCategoryById(categoryId);

      const newTask: Task = { 
        id, 
        title, 
        status: TaskStatus.OPEN , 
        description, 
        category 
      };

      this.db.push(`/tasks/${id}`, newTask);
      return newTask;
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      this.db.delete(`/tasks/${id}`);
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  private getCategoryById(id: string): Promise<any> {
    try {
      return this.db.getData(`/categories/${id}`);
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
