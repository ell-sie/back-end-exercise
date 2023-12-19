import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entitites/category.entity';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }
  

  @Post()
  @ApiResponse({ status: 201, description: 'The category has been added successfully'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
    @ApiBody({
      
       type: Category,
       description: 'Json structure for user object',
    })
  create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The category has been deleted successfully'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  @ApiResponse({ status: 500, description: 'Not Found'})
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoriesById(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The category has been deleted successfully'})
  @ApiResponse({ status: 409, description: 'Cannot delete category with associated tasks'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriesService.delete(id);
  }
}
