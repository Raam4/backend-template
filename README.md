## Descripción

Template Backend con autenticación y autorización implementadas.


## Instalación y puesta en marcha

Instalar dependencias:

```bash
$ npm install
```

Completar .env.example y renombrar (a .env).
Luego ejecutar la aplicación, lo que generará las tablas en la base de datos automáticamente:

```bash
$ npm run start
```

Cortar ejecución (ctrl+c) y ejecutar migraciones, lo que generará los registros básicos en las tablas creadas previamente:

```bash
$ npm run typeorm:migration-run
```

El usuario creado (admin) tendrá rol super, y su contraseña será la que se haya configurado en el .env.
Ejecutar la aplicación nuevamente en modo desarrollo:

```bash
$ npm run start:dev
```

## Tecnologías y documentación

- [Nestjs](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)


## Componentes

Incluye:
- Configuración de base de datos MySQL con TypeORM.
- Migraciones para creación automática de datos básicos.
- Autenticación con Passport y JWT local. En rama 'main' a traves del header de Authorization, en rama 'cookie-auth' a traves de cookies httpOnly.
- Autorización con roles únicos y permisos de acceso a rutas.
- Ruteo preparado para aplicación Frontend.
- Métodos de subida y descarga de archivos.
- Logger en base de datos de request POST y PUT/PATCH.
- Configuración de SSL para producción (comentado en main.ts).


## Por hacer

- Uso de RBAC en controladores.
- Manejo customizado de errores y excepciones.
- Modularización de métodos comunes (servicios y controladores).
- Método de registro (sign up).

## Videos y tutoriales
- [TypeScript Crash Course](https://youtu.be/BCg4U1FzODs)
- [NestJS Crash Course](https://youtu.be/wqhNoDE6pb4)
- [API with NestJS](https://wanago.io/courses/api-with-nestjs/)
- [Curso práctico NestJS](https://youtu.be/NYoCbihISxw)
