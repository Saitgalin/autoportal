import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SocialDto {
    @ApiProperty()
    @IsString()
    readonly vk: string

    @ApiProperty()
    @IsString()
    readonly fb: string

    @ApiProperty()
    @IsString()
    readonly youtube: string

    @ApiProperty()
    @IsString()
    readonly ok: string

    @ApiProperty()
    @IsString()
    readonly inst: string

    @ApiProperty()
    @IsString()
    readonly tweet: string
}