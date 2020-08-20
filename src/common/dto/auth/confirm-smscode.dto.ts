import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString} from "class-validator";

export class ConfirmSmscodeDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  smsCode: string

}
