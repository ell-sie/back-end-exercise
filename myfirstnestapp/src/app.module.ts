import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { CategoriesService } from './categories/categories.service';
import { TaskService } from './tasks/tasks.service';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [],
  controllers: [TasksController, CategoriesController],
  providers: [TaskService,CategoriesService],
})
export class AppModule {}
