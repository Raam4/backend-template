## Descripción

Template Backend idealmente para utilizar en conjunto con el [Template Frontend de React](https://github.com/DesarrolloCipo/frontend-template).


## Instalación

```bash
$ npm install
```
Completar .env.example y renombrar (a .env).

```bash
$ npm run start:dev
```


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

## Videos y tutoriales
- [TypeScript Crash Course](https://youtu.be/BCg4U1FzODs)
- [NestJS Crash Course](https://youtu.be/wqhNoDE6pb4)
- [API with NestJS](https://wanago.io/courses/api-with-nestjs/)
- [Curso práctico0 NestJS](https://youtu.be/NYoCbihISxw)
