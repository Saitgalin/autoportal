import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {Address} from "./repository/address.entity";
import {CreateAddressDto} from "../../../common/dto/address/create-address.dto";
import {City} from "../city/repository/city.entity";
import {CityService} from "../city/city.service";
import {Contacts} from "../contacts/repository/contacts.entity";

@Injectable()
export class AddressService {
    constructor(
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<Address>,
        private readonly cityService: CityService
    ) {
    }

    async create(createAddress: CreateAddressDto): Promise<Address> {
        let address = new Address()
        const city = await this.cityService.find(createAddress.city)
        if (city === undefined)
            throw new NotFoundException('Этого города нет в списке')

        address.city = city
        address.houseNumber = createAddress.houseNumber
        address.street = createAddress.street

        return address;
    }
}
