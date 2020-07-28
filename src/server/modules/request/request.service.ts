import {BadRequestException, Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {Request} from "./repository/request.entity";
import {CreateRequestDto} from "../../../common/dto/request/create-request.dto";
import {AutoService} from "../auto/auto.service";
import {Autopart} from "../autopart/repository/autopart.entity";
import {CreateAutopartDto} from "../../../common/dto/request/create-autopart.dto";
import {SubAccountService} from "../subaccount/subaccount.service";
import {ServicesService} from "../services/services.service";
import {SubAccountRequest} from "../subaccount-request/repository/subaccount-request.entity";
import {SubaccountRequestService} from "../subaccount-request/subaccount-request.service";

@Injectable()
export class RequestService {
    constructor(
        @Inject('REQUEST_REPOSITORY')
        private readonly requestRepository: Repository<Request>,
        private readonly autoService: AutoService,
        private readonly subAccountService: SubAccountService,
        private readonly servicesService: ServicesService,
        private readonly subAccountRequestService: SubaccountRequestService
    ) {
    }

    async create(createRequestDto: CreateRequestDto): Promise<Request> {
        const request = new Request()

        request.auto = await this.autoService.findByMakeModel(
            createRequestDto.autoMake,
            createRequestDto.autoModel
        )
        if (request.auto === undefined)
            throw new BadRequestException('Этого автомобиля нет в базе данных')

        request.autopart = this.createAutoparts(request, createRequestDto.autoparts)
        request.email = createRequestDto.email
        request.name = createRequestDto.name
        request.vin = createRequestDto.vin
        request.phoneNumber = createRequestDto.phoneNumber

        const service = await this.servicesService.findByMakeAndType(request.auto.make, request.auto.type)
        const subAccountWithRequestServices = await this.subAccountService.autoShopsWithCertainService(service)

        const savedSubAccountRequests: SubAccountRequest[] = []

        for (const subAccount of subAccountWithRequestServices) {
            const subAccountRequest = new SubAccountRequest()
            subAccountRequest.request = request
            subAccountRequest.subAccount = subAccount
            const savedSubAccountRequest = await this.subAccountRequestService.save(subAccountRequest)
            savedSubAccountRequests.push(savedSubAccountRequest)

            subAccount.subAccountRequests.push(savedSubAccountRequest)
            await this.subAccountService.save(subAccount)
        }

        request.subAccountRequests = savedSubAccountRequests

        return await this.requestRepository.save(request)
    }

    async uploadRequestImage(file: any, requestId: number): Promise<boolean>  {
        const request = await this.requestRepository.findOne({id: requestId});
        if (request === undefined)
            throw new NotFoundException('При загрузке изображения не была найдена заявка')

        request.vinpic = file.filename
        await this.requestRepository.save(request)
        return true
    }

    private createAutoparts(request: Request, createAutopartDto: CreateAutopartDto[]) {
        const autoparts = []

        createAutopartDto.forEach((autopartDto) => {
            const autopart = new Autopart()
            autopart.title = autopartDto.title
            autopart.type = autopartDto.autopartType
            autoparts.push(autopart)
        })

        return autoparts
    }


}
