import {Services} from "../services/repository/services.entity";
import {SubAccountPhoto} from "../subaccount-photo/repository/subaccount-photo.entity";
import {Contacts} from "../contacts/repository/contacts.entity";

export interface AutostoreInterface {
  readonly title: string;
  readonly description?: string;
  readonly services: Services[];
  readonly photos: SubAccountPhoto[];
  readonly contacts: Contacts;
}
