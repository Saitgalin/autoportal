import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

export class AccountGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request)
    }

    async validateRequest(request): Promise<boolean> {
        const authToken = request.authToken;

        return false
    }

}