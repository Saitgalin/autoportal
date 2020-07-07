import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString} from "class-validator";

export class GetSubAccountPhotos {

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  subAccountId: number

}