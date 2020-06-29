import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
import {Repository} from "typeorm";
import {Contacts} from "./repository/contacts.entity";
import {ICreateContacts} from "../../../common/dto/contacts/i-create.contacts";
import {AddressService} from "../address/address.service";
import {Address} from "../address/repository/address.entity";
import {SocialService} from "../social/social.service";
import {CreateAddressDto} from "../../../common/dto/address/create-address.dto";
import {SubAccount} from "../subaccount/repository/subaccount.entity";
import {Social} from "../social/repository/social.entity";
import {tryCatch} from "rxjs/internal-compatibility";

@Injectable()
export class ContactsService {
    constructor(
        @Inject('CONTACTS_REPOSITORY')
        private readonly contactsRepository: Repository<Contacts>,
        private readonly addressService: AddressService,
        private readonly socialService: SocialService
    ) {
    }

    async create(createContacts: ICreateContacts) {
        let contacts = new Contacts()

        contacts.phoneNumber = createContacts.phoneNumber
        contacts.website = createContacts.website
        contacts.workScheduleFrom = createContacts.workScheduleFrom
        contacts.workScheduleTo = createContacts.workScheduleTo

        contacts.social = await this.socialService.create(createContacts.socials)

        contacts.addresses = await this.getAddresses(createContacts.address)

        return contacts;
    }

    async getAddresses(createAddressDto: CreateAddressDto): Promise<Address[]> {
        //TODO: реализовать несколько адресов
        const addresses: Address[] = []
        try {
            const address = await this.addressService.create(createAddressDto)
            addresses.push(address)
        } catch (e) {
            throw new BadRequestException(e)
        }
        return addresses
    }
}
