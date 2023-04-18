import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  create(@Body() createRutaDto: CreateRutaDto) {
    return this.rutasService.create(createRutaDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  @Get('path/:path')
  findByPath(@Param('path') path: string) {
    return this.rutasService.findByPath(path);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRutaDto: UpdateRutaDto) {
    return this.rutasService.update(id, updateRutaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.remove(id);
  }

  @Patch('/restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.restore(id);
  }
}
