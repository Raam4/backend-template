import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ruta } from './entities/ruta.entity';

@Injectable()
export class RutasService {
  
  constructor(
    @InjectRepository(Ruta)
    private rutaRepository: Repository<Ruta>
  ){}

  async create(createRutaDto: CreateRutaDto): Promise<Ruta> {
    const createdRuta = this.rutaRepository.create(createRutaDto);
    await this.rutaRepository.save(createdRuta);
    return createdRuta;
  }

  findAll(): Promise<Ruta[]> {
    return this.rutaRepository.find({
      relations: { roles_entities: true }
    });
  }

  async findById(id: number): Promise<Ruta> {
    const ruta = await this.rutaRepository.findOne({ where: { id }, withDeleted: true });
    return ruta;
  }

  async findByPath(path: string): Promise<Ruta> {
    const ruta = await this.rutaRepository.findOne({ where: { path }, withDeleted: true });
    return ruta;
  }

  async update(id: number, updateRutaDto: UpdateRutaDto): Promise<Ruta> {
    await this.rutaRepository.save({id, ...updateRutaDto});
    const updatedRuta = await this.findById(id);
    return updatedRuta;
  }

  async remove(id: number) {
    const deleteResponse = await this.rutaRepository.softDelete(id);
    if(!deleteResponse.affected) throw new NotFoundException("Ruta no encontrado");
  }

  async restore(id: number) {
    const restoreResponse = await this.rutaRepository.restore(id);
    if(!restoreResponse.affected) throw new NotFoundException("Ruta no encontrado");
  }
}
