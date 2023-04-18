import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }
  
  @Get('username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.usuariosService.findOneByUsername(username);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.restore(id);
  }

  @Delete('force/:id')
  forceRemove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.forceRemove(id);
  }
}
