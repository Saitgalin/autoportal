import {Connection} from "typeorm";
import {TokenRepository} from "./token.repository";

export const tokenProviders = [
    {
        provide: 'TOKEN_REPOSITORY',
        useFactory: (connection: Connection) => connection.getCustomRepository(TokenRepository),
        inject: ['DATABASE_CONNECTION']
    }
]