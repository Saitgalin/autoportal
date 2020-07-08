import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {SubAccountPhoto} from "./repository/subaccount-photo.entity";
import {SubAccount} from "../subaccount/repository/subaccount.entity";
import {Response} from "express";
import * as path from "path";
import {Account} from "../account/repository/account.entity";
import {SubAccountService} from "../subaccount/subaccount.service";

@Injectable()
export class SubAccountPhotoService {
    constructor(
        @Inject('SUBACCOUNT_PHOTO_REPOSITORY')
        private readonly subAccountPhotoRepository: Repository<SubAccountPhoto>,
        private readonly subAccountService: SubAccountService
    ) {
    }

    async addPhoto(subAccount: SubAccount, file: any): Promise<SubAccountPhoto> {
        const subAccountPhoto = new SubAccountPhoto()
        subAccountPhoto.path = file.filename
        subAccountPhoto.subAccount = subAccount
        return await this.subAccountPhotoRepository.save(subAccountPhoto)
    }

    async uploadPhoto(account: Account, file, subAccountId: number): Promise<SubAccountPhoto> {
        const subAccount = await this.subAccountService.subAccountOfTheOwner(account, subAccountId)

        return await this.addPhoto(subAccount, file)
    }

    async subAccountFirstPhoto(subAccountId: number, response: Response): Promise<void> {
        const subAccount = await this.subAccountService.subAccount(subAccountId)
        const photos = await this.getPhotos(subAccount)

        if (photos === undefined || photos.length === 0) {
            return
        }

        const imagePath = path.resolve(`./files/subAccountFiles/${photos[0].path}`)

        response.sendFile(imagePath)
    }

    async imagePathsBySubAccount(subAccountId: number): Promise<string[]> {
        const subAccount = await this.subAccountService.subAccount(subAccountId)
        const photos = await this.getPhotos(subAccount)
        if (photos === undefined || photos.length === 0) {
            return null
        }

        const photoPaths = []
        photos.forEach(photo => {
            photoPaths.push(photo.path)
        })

        return photoPaths
    }

    async subAccountPhotoByPath(imagePath: string, response: Response) {
        const image = path.resolve(`./files/subAccountFiles/${imagePath}`)
        response.sendFile(image)
    }

    async photos(subAccount: SubAccount): Promise<SubAccountPhoto[]> {
        return await this.subAccountPhotoRepository.find({where: {
                subAccount: subAccount
            }})
    }

    private async getPhotos(subAccount: SubAccount): Promise<SubAccountPhoto[] | undefined> {
        return await this.photos(subAccount)
    }


}
