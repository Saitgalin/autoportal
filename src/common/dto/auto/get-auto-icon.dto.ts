import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString} from "class-validator";

export class GetAutoIconDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  autoId: number

}