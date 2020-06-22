import {Inject, Injectable} from '@nestjs/common';
import {Category} from "./repository/category.entity";
import {Repository} from "typeorm";
import {IReadableCategory} from "../../../common/readable/category/IReadableCategory";

@Injectable()
export class CategoryService {

    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private readonly categoryRepository: Repository<Category>
    ) {
    }

    async all(): Promise<Category[]> {
        return await this.categoryRepository.find()
    }

    async findById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({ where: { id: id }})
    }

}
