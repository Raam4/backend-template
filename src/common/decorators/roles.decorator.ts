import { SetMetadata } from "@nestjs/common";

export const Roles = (...rol: string[]) => SetMetadata('roles', rol);