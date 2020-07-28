import {Controller, Get} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {ApiTags} from "@nestjs/swagger";
import {IReadableCategory} from "../../../common/readable/category/IReadableCategory";
import {Category} from "./repository/category.entity";

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {
    }

    @Get('/all')
    async all(): Promise<IReadableCategory[]> {
        return await this.categoryService.all()
    }


}
