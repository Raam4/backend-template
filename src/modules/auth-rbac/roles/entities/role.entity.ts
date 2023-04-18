import { Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Ruta } from "../../rutas/entities/ruta.entity";

@Entity({ name: "roles" })
export class Role {
    @PrimaryColumn({ length: 10 })
    id: string;

    //relations
    @OneToMany(() => Usuario, (usuario: Usuario) => usuario.rol)
    usuarios: Usuario[];

    @ManyToMany(() => Ruta, (ruta: Ruta) => ruta.roles_entities)
    rutas: Ruta[];
}
