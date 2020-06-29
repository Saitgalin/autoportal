import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Social} from "./repository/social.entity";
import {SocialDto} from "../../../common/dto/social/social.dto";

@Injectable()
export class SocialService {
    constructor(
        @Inject('SOCIAL_REPOSITORY')
        private readonly socialRepository: Repository<Social>
    ) {
    }

    async create(socialDto: SocialDto): Promise<Social> {
        let social = new Social()

        social.fb = socialDto.fb
        social.inst = socialDto.inst
        social.tweet = socialDto.tweet
        social.ok = socialDto.ok
        social.youtube = socialDto.youtube
        social.vk = socialDto.vk

        return social;
    }
}
