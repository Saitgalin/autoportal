import {FileUploadDto} from "../file/file-upload.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class LoadAutoImageDto extends FileUploadDto{

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  autoId: string
}