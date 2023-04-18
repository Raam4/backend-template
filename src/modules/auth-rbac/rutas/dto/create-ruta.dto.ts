import { Role } from "../../roles/entities/role.entity";

export class CreateRutaDto {
    name: string;
    path: string;
    roles_entities: Role[];
    shown: boolean;
}
