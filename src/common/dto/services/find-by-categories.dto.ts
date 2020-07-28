import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty} from "class-validator";
import {SubAccountCategoryEnum} from "../../enum/subaccount/subaccount-category.enum";

export class FindByCategoriesDto {

  @ApiProperty({enum: SubAccountCategoryEnum})
  @IsEnum(SubAccountCategoryEnum)
  @IsNotEmpty()
  categoryTitle: SubAccountCategoryEnum



}

