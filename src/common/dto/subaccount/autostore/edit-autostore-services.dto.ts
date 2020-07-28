import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {AutoTypeEnum} from "../../../enum/auto/auto-type.enum";

export class EditAutostoreServicesDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  subAccountId: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional({enum: AutoTypeEnum})
  @IsOptional()
  @IsEnum(AutoTypeEnum)
  type?: AutoTypeEnum
}
