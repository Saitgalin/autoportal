import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString, IsString} from "class-validator";

export class GetAutoIconDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  autoTitle: string

}
