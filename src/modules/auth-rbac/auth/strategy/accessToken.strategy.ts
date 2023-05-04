import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from "src/modules/auth-rbac/usuarios/usuarios.service";

type JwtPayload = {
    id: number,
    username: string,
    id_rol: string
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UsuariosService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                AccessTokenStrategy.extractJWTFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            secretOrKey: "" + process.env.JWT_SECRET
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findOneByUsername(payload.username);
        if(!user){
            throw new UnauthorizedException();
        }
        return payload;
    }

    private static extractJWTFromCookie(req: Request): string | null {
        if(
            req.cookies &&
            'accessToken' in req.cookies &&
            req.cookies.accessToken.length > 0
        ){
            return req.cookies.accessToken;
        }
        return null;
    }
}