## Descripción

Template Backend idealmente para utilizar en conjunto con el [Template Frontend de React](https://github.com/DesarrolloCipo/frontend-template).


## Instalación

Crear la base en localhost, completar .env.example y renombrar (a .env).
Ejemplo en localhost:
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=[user]
MYSQL_PASSWORD=[password]
MYSQL_DATABASE=[nombre de base]
JWT_SECRET=secret
HOST_API=http://localhost:3005/api

Ejecutar los siguientes comandos:
```bash
$ npm install
```
```bash
$ npm run start:dev
```
Esto generará las tablas necesarias en la base seleccionada, luego correr las siguientes querys en la base:
  INSERT INTO roles (id) VALUES ('super');
  INSERT INTO usuarios (id_rol, username, password, nombres, reset, fecha_baja) VALUES
    ('super', 'admin', '$2a$10$.cU3dTmjvWPondDxLhGgH.iKEUem8eKuUKnzqjjlCil.CcjVsDasa', 'Ad Min', false, null);
  INSERT INTO rutas (name, path, shown) VALUES
    ('Usuarios','super/usuarios_lista',1),
    ('Agregar usuario','super/agregar_usuario',1),
    ('Editar usuario','super/editar_usuario/:usuarioId',0),
    ('Roles','super/roles_lista',1),
    ('Rutas','super/rutas_lista',1);
  INSERT INTO rutas_roles (rutasId, rolesId) VALUES
    (1,'super'),
    (2,'super'),
    (3,'super'),
    (4,'super'),
    (5,'super');
    
Estos registros son los básicos para el funcionamiento; crea un rol 'super', un usuario admin con la misma contraseña y las rutas básicas para la aplicación frontend.

## Tecnologías y documentación

- [Nestjs](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)


## Componentes

Incluye:
- Configuración de base de datos MySQL con TypeORM.
- Autenticación con Passport y JWT local. En rama 'main' a traves del header de Authorization, en rama 'cookie-auth' a traves de cookies httpOnly.
- Autorización con roles únicos y permisos de acceso a rutas.
- Ruteo de aplicación Frontend.
- Métodos de subida y descarga de archivos.
- Logger en base de datos de request POST y PUT/PATCH.
- Configuración de SSL para producción (comentado en main.ts).


## Por hacer

- Uso de RBAC en controladores.
- Manejo customizado de errores y excepciones.
- Modularización de métodos comunes (servicios y controladores).
- Método de registro (sign up).
- Migraciones para creación automática de datos básicos.

## Videos y tutoriales
- [TypeScript Crash Course](https://youtu.be/BCg4U1FzODs)
- [NestJS Crash Course](https://youtu.be/wqhNoDE6pb4)
- [API with NestJS](https://wanago.io/courses/api-with-nestjs/)
- [Curso práctico NestJS](https://youtu.be/NYoCbihISxw)
