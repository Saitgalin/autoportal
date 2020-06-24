import {IsString} from "class-validator";

export class SocialDto {
    @IsString()
    readonly vk: string

    @IsString()
    readonly fb: string

    @IsString()
    readonly youtube: string

    @IsString()
    readonly ok: string

    @IsString()
    readonly inst: string

    @IsString()
    readonly tweet: string
}