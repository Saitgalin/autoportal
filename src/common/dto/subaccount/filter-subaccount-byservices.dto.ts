import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Query} from "@nestjs/common";
import {Transform, Type} from "class-transformer";

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

}
