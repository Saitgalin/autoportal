import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches} from "class-validator";
import {UniqueOnDatabase} from "../../../server/utils/unique-validation";
import {Account} from "../../../server/modules/account/repository/account.entity";

export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message: 'Фио должно быть заполнено'})
    readonly fio: string

    @ApiProperty()
    @IsPhoneNumber('RU', {message: 'Введите реальный номер телефона'})
    @IsNotEmpty({message: 'Телефон должен быть заполнен'})
    @UniqueOnDatabase(Account, {message: 'Пользователь с этим телефоном уже зарегестрирован'})
    readonly phone: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({message: 'Email должен быть заполнен'})
    @UniqueOnDatabase(Account, {message: 'Пользователь с этим email уже зарегестрирован'})
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Слабый пароль' },
    )
    @ApiProperty()
    readonly password: string
}
