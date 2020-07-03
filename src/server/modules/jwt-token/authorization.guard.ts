import {CanActivate, ExecutionContext, Injectable, Logger} from "@nestjs/common";
import {JwtTokenService} from "./jwt-token.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private jwtTokenService: JwtTokenService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        try {
            const bearerToken = request
                .headers
                .authorization
                .split("Bearer ")[1]

            const user = await this.jwtTokenService.accountByToken(bearerToken)
            request.user = await user
        } catch (e) {
            return null
        }

        return request.user !== undefined && request.user !== null;
    }
}