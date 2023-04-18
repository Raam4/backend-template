import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ){}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(createdRole);
    return createdRole;
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id }, withDeleted: true });
    if(!role) throw new NotFoundException("Rol no encontrado");
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.roleRepository.update(id, updateRoleDto);
    const updatedRole = await this.findById(id);
    return updatedRole;
  }

  async remove(id: string) {
    const deleteResponse = await this.roleRepository.softDelete(id);
    if(!deleteResponse.affected) throw new NotFoundException("Rol no encontrado");
  }

  async restore(id: string) {
    const restoreResponse = await this.roleRepository.restore(id);
    if(!restoreResponse.affected) throw new NotFoundException("Rol no encontrado");
  }
}
