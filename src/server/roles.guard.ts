import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user

  }

  private async matchRoles() {

  }

}