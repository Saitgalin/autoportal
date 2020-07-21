import {Inject, Injectable} from '@nestjs/common';
import {Category} from "./repository/category.entity";
import {Repository} from "typeorm";
import {SubAccountCategoryEnum} from "../../../common/enum/subaccount/subaccount-category.enum";

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

    async findByName(title: SubAccountCategoryEnum): Promise<Category> {
        return await this.categoryRepository.findOne({where: {title: title}})
    }

    async findById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({where: { id: id }})
    }


}
