import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsOptional, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";
import {SubAccountCategoryEnum} from "../../enum/subaccount/subaccount-category.enum";

export class FilterSubAccountDto {

  @ApiProperty()
  @IsString()
  page: string = "1"

  @ApiProperty()
  @IsString()
  limit: string = "12"

  @IsOptional()
  @ApiProperty({required: false})
  @IsString()
  conditions?: string = ''


  @IsOptional()
  @ApiProperty({type: IsArray, isArray: true})
  @IsString({each: true})
  @Type(() => String)
  @Transform((value: string) => value.split(','))
  @IsArray()
  services?: string[]

  @ApiProperty({enum: SubAccountCategoryEnum})
  @IsString()
  readonly subAccountCategory: SubAccountCategoryEnum

}
