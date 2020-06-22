import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import {DatabaseModule} from "../db/database.module";
import {categoryProviders} from "./repository/category.providers";
import { CategoryController } from './category.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
      CategoryService,
    ...categoryProviders
  ],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
