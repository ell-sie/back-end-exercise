import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entitites/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  @Post()
  create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoriesById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriesService.delete(id);
  }
}
