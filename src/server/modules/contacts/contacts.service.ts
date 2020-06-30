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

        contacts.phoneNumber = parseInt(createContacts.phoneNumber)
        contacts.website = createContacts.website
        contacts.workScheduleFrom = createContacts.workScheduleFrom
        contacts.workScheduleTo = createContacts.workScheduleTo

        contacts.social = await this.socialService.create(createContacts.socials)

        //TODO: реализовать несколько адресов
        contacts.addresses = await this.getAddresses(createContacts.address[0])

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
