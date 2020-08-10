import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString, IsString} from "class-validator";

export class EditSubAccountDescriptionDto {

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  subAccountId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

}
