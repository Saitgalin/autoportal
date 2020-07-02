import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {SubAccountPhoto} from "./repository/subaccount-photo.entity";
import {SubAccount} from "../subaccount/repository/subaccount.entity";

@Injectable()
export class SubAccountPhotoService {
    constructor(
        @Inject('SUBACCOUNT_PHOTO_REPOSITORY')
        private readonly subAccountPhotoRepository: Repository<SubAccountPhoto>
    ) {
    }

    async addPhoto(subAccount: SubAccount, file: any): Promise<SubAccountPhoto> {
        const subAccountPhoto = new SubAccountPhoto()
        subAccountPhoto.path = file.filename
        subAccountPhoto.subAccount = subAccount
        return await this.subAccountPhotoRepository.save(subAccountPhoto)
    }
}
