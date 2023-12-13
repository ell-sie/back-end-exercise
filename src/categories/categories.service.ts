import { ConflictException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Category } from 'src/entitites/category.entity';

@Injectable()
export class CategoriesService {
  private db = new JsonDB(new Config('myDataBase', true, false, '/'));

  getAll(): Promise<Category[]> {
    return this.db.getData('/categories');
  }

  create(category: Category): Promise<Category> {
    category.id = uuidv4();
    this.db.push('/categories[]', category);
    return Promise.resolve(category);
  }

  async getCategoriesById(id: string): Promise<Category> {
    try {
      const categories: Category[] = await this.db.getData('/categories');
      const category = categories.find((c: Category) => c.id === id);

      if (category) {
        return Promise.resolve(category);
      } else {
        return Promise.reject(new Error('Category not found'));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: string): Promise<void> {
    // Retrieve tasks and then filter them
    const tasksObject = await this.db.getData('/tasks');
    const categoryIndex = await this.db.getIndex('/categories', id)
    console.log(categoryIndex)
    const tasks = Object.values(tasksObject);
    console.log(tasks,'========> tasks')
    const tasksForCategory = tasks.filter((task: any) => task.category === categoryIndex);
    console.log(tasksForCategory)
    if (tasksForCategory.length > 0) {
      // Tasks found for the category, return a ConflictException
      throw new ConflictException('Cannot delete category with associated tasks');
    }

    // No tasks found, proceed with category deletion
    const index = this.db.getIndex('/categories', id);
    this.db.delete(`/categories[${index}]`);
  }
}

