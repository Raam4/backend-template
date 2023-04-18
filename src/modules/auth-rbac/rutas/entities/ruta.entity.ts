import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity({ name: "rutas" })
export class Ruta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    shown: boolean;

    @RelationId((ruta: Ruta) => ruta.roles_entities)
    roles: string[];

    //relations
    @ManyToMany(() => Role, (rol: Role) => rol.rutas, { cascade: true })
    @JoinTable({ name: "rutas_roles" })
    roles_entities: Role[];
}
