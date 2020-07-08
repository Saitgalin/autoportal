import {FileUploadDto} from "../file/file-upload.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class RequestFileUploadDto extends FileUploadDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    requestId: string
}