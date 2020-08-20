import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {UniqueOnDatabase} from "../../../server/utils/unique-validation";
import {Account} from "../../../server/modules/account/repository/account.entity";

export class EditAccountDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string

  @ApiProperty()
  @IsString()
  readonly lastName: string

  @ApiProperty()
  @IsString()
  readonly middleName: string

  @ApiProperty()
  @IsDateString()
  readonly birthDate: Date

  @ApiProperty()
  @IsPhoneNumber('RU', {message: 'Введите реальный номер телефона'})
  @UniqueOnDatabase(Account, {message: 'Пользователь с этим телефоном уже зарегестрирован'})
  readonly phone: string

  @ApiProperty()
  @UniqueOnDatabase(Account, {message: 'Пользователь с этим email уже зарегестрирован'})
  readonly email: string
}
