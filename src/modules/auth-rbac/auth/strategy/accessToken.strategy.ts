import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from "src/modules/auth-rbac/usuarios/usuarios.service";

type JwtPayload = {
    username: string
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UsuariosService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findOneByUsername(payload.username);
        if(!user){
            throw new UnauthorizedException();
        }
        return payload;
    }

}