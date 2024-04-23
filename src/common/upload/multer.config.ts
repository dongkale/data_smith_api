import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

// @Injectable()
// export class MulterConfigService implements MulterOptionsFactory {
//   dirPath: string;
//   constructor(private readonly path: string) {
//     this.dirPath = path; //  path;

//     fs.mkdirSync(this.dirPath, { recursive: true });
//   }

//   createMulterOptions(): MulterOptions {
//     const dirPath = this.dirPath;
//     const option = {
//       storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//           cb(null, dirPath);
//         },

//         filename: (req, file, cb) => {
//           const ext = path.extname(file.originalname);
//           const name = path.basename(file.originalname, ext);
//           cb(null, `${name}_${Date.now()}${ext}`);
//         },
//       }),
//       limits: {
//         fileSize: 1024 * 1024 * 10, // 10MB
//       },
//     };
//     return option;
//   }
// }

export const multerConfigService = (dirPath: string) => {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (error) {
    console.error('Error while creating directory', error);
  }

  return {
    storage: multer.diskStorage({
      destination: async (req, file, cb) => {
        return cb(null, dirPath);
      },
      filename: (req, file, cb) => {
        // const fileName = file.originalname.split('.');
        //   const fileExt = fileName.pop();
        const fileExt = path.extname(file.originalname); // .ext;
        const fileName = path.basename(file.originalname, fileExt);
        return cb(null, `${fileName}_${Date.now()}${fileExt}`);
      },
    }),
  };
};
