import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {SubAccountCategoryEnum} from "../../enum/subaccount/subaccount-category.enum";
import {AutoTypeEnum} from "../../enum/auto/auto-type.enum";

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsEnum(SubAccountCategoryEnum)
  @IsNotEmpty()
  category: SubAccountCategoryEnum

  @ApiPropertyOptional({enum: AutoTypeEnum})
  @IsOptional()
  @IsEnum(AutoTypeEnum)
  type?: AutoTypeEnum
}
