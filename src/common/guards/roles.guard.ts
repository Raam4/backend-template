import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/modules/auth-rbac/roles/entities/role.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRol = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        if(!requiredRol){
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return requiredRol.some((rol) => user?.id_rol === rol);
    }
}