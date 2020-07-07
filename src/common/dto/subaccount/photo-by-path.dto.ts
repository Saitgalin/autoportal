import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class PhotoByPathDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  path: string
}