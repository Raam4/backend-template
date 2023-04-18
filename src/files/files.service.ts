import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService
  ){}

  getFile(fileName: string){
    const path = join(
      __dirname,
      '../../src/uploads',
      `${fileName}`
      );
    if(!existsSync(path)){
      throw new BadRequestException('File not found');
    }
    return path;
  }

  deleteFile(fileName: string){
    const path = join(
      __dirname,
      '../../src/uploads',
      `${fileName}`
      );
    if(!existsSync(path)){
      throw new BadRequestException('File not found');
    }
    return path;
  }
}
