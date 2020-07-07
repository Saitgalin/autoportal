import {createParamDecorator} from "@nestjs/common";
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host";

export const AuthAccount = createParamDecorator(
    (data: string, req: ExecutionContextHost) => {
        return req.switchToHttp().getRequest().user
    }
)