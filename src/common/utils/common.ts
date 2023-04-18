// npm i exceljs and edit configs
/* import { BadRequestException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';

export const createExcel = async (data: any, headers: any) => {
    const book = new Workbook();
    const sheet = book.addWorksheet('Hoja 1');
    sheet.columns = headers.map( (header: any) => ({
      header: header.label,
      key: header.key,
      width: 20,
      style: { alignment: { horizontal: "center" } }
    }));
    data.map( (row: any) => sheet.addRow(row));
    const File = await new Promise((resolve) => {
      tmp.file({
        discardDescriptor: true,
        prefix: 'file-name',
        postfix: '.xlsx',
        mode: parseInt('0600', 8)}, async (err, file) => {
          if(err){
            throw new BadRequestException(`Error en el servidor: ${err}`);
          }
          book.xlsx.writeFile(file).then(_ => {
            resolve(file)
          }).catch(err => {
            throw new BadRequestException(`Error en el servidor: ${err}`);
          });
        }
      );
    });
    return File;
} */