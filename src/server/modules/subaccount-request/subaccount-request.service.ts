import {Inject, Injectable} from "@nestjs/common";
import {SubAccountRequest} from "./repository/subaccount-request.entity";
import {Repository} from "typeorm";
import {SubAccountPhoto} from "../subaccount-photo/repository/subaccount-photo.entity";

@Injectable()
export class SubaccountRequestService {

    constructor(
        @Inject('SUBACCOUNT_REQUEST_REPOSITORY')
        private readonly subAccountRequestRepository: Repository<SubAccountRequest>,
        ) {
    }

    async save(subAccountRequest: SubAccountRequest): Promise<SubAccountRequest> {

        return await this.subAccountRequestRepository.save(subAccountRequest)
    }
}