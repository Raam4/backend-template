import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Public } from '../common/decorators/public.decorator';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Get(':fileName')
  getFile(
    @Res() res: Response,
    @Param('fileName') fileName: string
  ){
    const path = this.filesService.getFile(fileName);

    res.sendFile(path);
  }

  @Public()
  @Delete(':fileName')
  deleteFile(
    @Param('fileName') fileName: string
  ){
    const path = this.filesService.getFile(fileName);
    fs.unlink(path, (err) => {
      if(err){
        console.error(err);
        return err
      }
    })
  }
}
