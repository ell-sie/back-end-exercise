// import { Injectable } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
// import { JsonDB } from 'node-json-db';
// import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
// import { Category } from 'src/entitites/category.entity';

// @Injectable()
// export class CategoriesService {
//   getCategoriesById(id: string): any {
//       throw new Error('Method not implemented.');
//   }
//   private db = new JsonDB(new Config('myDataBase', true, false, '/'));

//   getAll(): Promise<Category[]> {
//     return this.db.getData('/categories');
//   }

//   create(category: Category): Promise<Category> {
//     category.id = uuidv4();
//     this.db.push('/categories[]', category);
//     return Promise.resolve(category);
//   }

//   delete(id: string): Promise<void> {
//     const index = this.db.getIndex('/categories', id);
//     this.db.delete(`/categories[${index}]`);
//     return Promise.resolve();
//   }
// }

import { Injectable } from '@nestjs/common';
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

  delete(id: string): Promise<void> {
    const index = this.db.getIndex('/categories', id);
    this.db.delete(`/categories[${index}]`);
    return Promise.resolve();
  }
}

