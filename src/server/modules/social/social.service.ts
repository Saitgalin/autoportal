import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Social} from "./repository/social.entity";
import {SocialDto} from "../../../common/dto/social/social.dto";
import * as _ from "lodash";
import {Contacts} from "../contacts/repository/contacts.entity";

@Injectable()
export class SocialService {
    constructor(
        @Inject('SOCIAL_REPOSITORY')
        private readonly socialRepository: Repository<Social>
    ) {
    }

    async create(socialDto: SocialDto, contacts: Contacts): Promise<Social> {
        const social = new Social()

        social.fb = socialDto.fb
        social.inst = socialDto.inst
        social.tweet = socialDto.tweet
        social.ok = socialDto.ok
        social.youtube = socialDto.youtube
        social.vk = socialDto.vk
        social.contacts = contacts

        return this.socialRepository.create(social);
    }
}
