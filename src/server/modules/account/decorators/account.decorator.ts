import {createParamDecorator, ExecutionContext, Logger} from "@nestjs/common";
import {JwtTokenService} from "../../jwt-token/jwt-token.service";
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host";

export const AuthAccount = createParamDecorator(
    (data: string, req: ExecutionContextHost) => {
        return req.switchToHttp().getRequest().user
    }
)