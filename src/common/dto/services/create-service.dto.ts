import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {SubAccountCategoryEnum} from "../../enum/subaccount/subaccount-category.enum";

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsEnum(SubAccountCategoryEnum)
  @IsNotEmpty()
  category: SubAccountCategoryEnum
}