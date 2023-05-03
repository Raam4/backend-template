import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { MigrationInterface, QueryRunner } from "typeorm"
import * as bcrypt from 'bcrypt';

config();

const configService = new ConfigService();

export class BasicData1683128982364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const cryptedPass = await bcrypt.hash(configService.get('ADMIN_INITIAL_PASSWORD'), 10);

        await queryRunner.query(`
            INSERT INTO roles (id) VALUES
                ('super');
        `);
        await queryRunner.query(`
            INSERT INTO usuarios (id_rol, username, password, nombres, reset, fecha_baja) VALUES
                ('super', 'admin', '${cryptedPass}', 'Ad Min', false, null);
        `);
        await queryRunner.query(`
            INSERT INTO rutas (name, path, shown) VALUES
                ('Usuarios','super/usuarios_lista',1),
                ('Agregar usuario','super/agregar_usuario',1),
                ('Editar usuario','super/editar_usuario/:usuarioId',0),
                ('Roles','super/roles_lista',1),
                ('Rutas','super/rutas_lista',1);
        `);
        await queryRunner.query(`
            INSERT INTO rutas_roles (rutasId, rolesId) VALUES
                (1,'super'),
                (2,'super'),
                (3,'super'),
                (4,'super'),
                (5,'super');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
