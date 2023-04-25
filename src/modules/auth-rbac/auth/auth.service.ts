import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  async login(authDto: AuthDto): Promise<any> {
    const user = await this.usuarioService.findOneByUsername(authDto.username);
    if(!user) throw new BadRequestException('El usuario no existe');
    const match = await bcrypt.compare(authDto.password, user.password);
    if(!match) throw new BadRequestException('Verifique su contraseña');
    const token = await this.generateToken(user.id, user.username, user.id_rol);
    const { password, ...userData } = user;
    return { token, userData };
  };

  async generateToken(id: number, username: string, id_rol: string){
    const token = await this.jwtService.signAsync(
      {
        id,
        username,
        id_rol
      },
      {
        secret: "" + this.configService.get<string>('JWT_SECRET'),
        expiresIn: '8h'
      }
    );
    return token;
  }
}
