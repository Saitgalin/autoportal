import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import {UnauthorizedException} from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: JwtTokenService
    ) {
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: "MySuperSecretString",
                passReqToCallback: true
            });
    }

    async validate(req, account: Partial<Account>) {
        const token = req.headers.authorization.slice(7)
        const tokenExists = this.tokenService.existsById(parseInt(account.id), token)
        if (tokenExists) {
            return account
        } else {
            throw new UnauthorizedException()
        }
    }
}