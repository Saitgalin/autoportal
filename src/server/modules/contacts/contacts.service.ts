import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Contacts} from "./repository/contacts.entity";
import {ICreateContacts} from "../../../common/dto/contacts/i-create.contacts";
import {AddressService} from "../address/address.service";
import {Address} from "../address/repository/address.entity";
import {SocialService} from "../social/social.service";
import {CreateAddressDto} from "../../../common/dto/address/create-address.dto";
import {SubAccount} from "../subaccount/repository/subaccount.entity";

@Injectable()
export class ContactsService {
    constructor(
        @Inject('CONTACTS_REPOSITORY')
        private readonly contactsRepository: Repository<Contacts>,
        private readonly addressService: AddressService,
        private readonly socialService: SocialService
    ) {
    }

    async create(createContacts: ICreateContacts, subAccount: SubAccount) {
        let contacts = new Contacts()
        contacts = await this.setAddresses(contacts, createContacts.address)

        contacts.phoneNumber = createContacts.phoneNumber
        contacts.website = createContacts.website
        contacts.workScheduleFrom = createContacts.workScheduleFrom
        contacts.workScheduleTo = createContacts.workScheduleTo
        contacts.social = await this.socialService.create(createContacts.socials, contacts)
        contacts.subAccount = subAccount

        return await this.contactsRepository.save(contacts)
    }

    async setAddresses(contacts: Contacts, createAddressDto: CreateAddressDto) {
        //TODO: реализовать несколько адресов
        const addresses: Address[] = []
        const address = await this.addressService.create(createAddressDto)
        addresses.push(address)
        contacts.addresses = addresses
        return contacts
    }
}
