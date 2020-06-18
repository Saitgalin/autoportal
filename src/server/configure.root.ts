import {ConfigModule} from "@nestjs/config";
import * as path from 'path';

export const configModule = ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    isGlobal: true,
    load: [() => ({
        dataPath: path.resolve(__dirname, '..', '..', 'data')
    })],
})