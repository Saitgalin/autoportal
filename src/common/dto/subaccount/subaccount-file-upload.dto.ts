import {FileUploadDto} from "../file/file-upload.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class SubAccountFileUploadDto extends FileUploadDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subAccountId: string
}