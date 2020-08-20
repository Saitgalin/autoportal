import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {AutopartTypeEnum} from "../../enum/request/autopart-type.enum";

export class CreateAutopartDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly autoPartTitle: string

    @ApiProperty({enum: AutopartTypeEnum})
    @IsString()
    @IsNotEmpty()
    readonly autoPartType: AutopartTypeEnum
}
