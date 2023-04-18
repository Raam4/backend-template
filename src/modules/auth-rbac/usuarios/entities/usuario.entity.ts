import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity({ name: "usuarios" })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    id_rol: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    nombres: string;

    @Column({ default: true })
    reset: boolean;

    @DeleteDateColumn({ type: 'date' })
    fecha_baja: string;

    @ManyToOne(() => Role, (rol: Role) => rol.usuarios)
    @JoinColumn({ name: "id_rol" })
    rol: Role;
}
