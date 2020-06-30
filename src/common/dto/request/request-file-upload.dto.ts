import {FileUploadDto} from "../file/file-upload.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class RequestFileUploadDto extends FileUploadDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    requestId: number
}