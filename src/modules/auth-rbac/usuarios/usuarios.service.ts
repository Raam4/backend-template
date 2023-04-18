import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>
  ){}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    createUsuarioDto = {
      ...createUsuarioDto,
      password: await bcrypt.hash(createUsuarioDto.password, 10)
    };
    const createdUsuario = this.usuariosRepository.create(createUsuarioDto);
    await this.usuariosRepository.save(createdUsuario);
    return createdUsuario;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOneByUsername(username: string): Promise<Usuario> {
    const user = await this.usuariosRepository.findOne({
      where: { username }
    });
    if(!user) throw new NotFoundException("Usuario no encontrado");
    return user;
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuariosRepository.findOne({
      where: { id },
      withDeleted: true
    });
    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    if(updateUsuarioDto.password != null) {
      updateUsuarioDto = {
        ...updateUsuarioDto,
        password: await bcrypt.hash(updateUsuarioDto.password, 10)
      };
    }
    await this.usuariosRepository.update(id, updateUsuarioDto);
    const updatedUsuario = await this.findOneByUsername(updateUsuarioDto.username);
    return updatedUsuario;
  }

  async remove(id: number) {
    const deleteResponse = await this.usuariosRepository.softDelete(id);
    if(!deleteResponse.affected) throw new NotFoundException("Usuario no encontrado");
  }

  async restore(id: number) {
    const restoreResponse = await this.usuariosRepository.restore(id);
    if(!restoreResponse.affected) throw new NotFoundException("Usuario no encontrado");
  }

  async forceRemove(id: number) {
    const deleteResponse = await this.usuariosRepository.delete(id);
    if(!deleteResponse.affected) throw new NotFoundException("Usuario no encontrado");
  }
}
