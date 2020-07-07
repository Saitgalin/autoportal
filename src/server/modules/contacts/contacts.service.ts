import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Contacts} from "./repository/contacts.entity";
import {IReadableCreateContacts} from "../../../common/readable/subaccount/i-readable-create.contacts";
import {AddressService} from "../address/address.service";
import {Address} from "../address/repository/address.entity";
import {SocialService} from "../social/social.service";
import {CreateAddressDto} from "../../../common/dto/address/create-address.dto";

@Injectable()
export class ContactsService {
    constructor(
        @Inject('CONTACTS_REPOSITORY')
        private readonly contactsRepository: Repository<Contacts>,
        private readonly addressService: AddressService,
        private readonly socialService: SocialService
    ) {
    }

    async create(createContacts: IReadableCreateContacts) {
        let contacts = new Contacts()

        contacts.phoneNumber = createContacts.phoneNumber
        contacts.website = createContacts.website
        contacts.workScheduleFrom = createContacts.workScheduleFrom
        contacts.workScheduleTo = createContacts.workScheduleTo

        contacts.social = await this.socialService.create(createContacts.socials)
        contacts.addresses = []

        for (const address of createContacts.address) {
            contacts.addresses.push(await this.getAddress(address));
        }
        return contacts;
    }

    async getAddress(createAddressDto: CreateAddressDto): Promise<Address> {
        try {
            return await this.addressService.create(createAddressDto)
        } catch (e) {
            throw new BadRequestException(e)
        }
    }


}
