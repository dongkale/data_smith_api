import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PartFileService } from './part-file.service';
import { ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import * as fs from 'fs';
import multer, { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { PartFile } from './part-file.entity';

// function getMulterOptions(dirPath): MulterOptions {
//   return {
//     storage: multer.diskStorage({
//       destination: async (req, file, cb) => {
//         return cb(null, dirPath);
//       },
//       filename: (req, file, cb) => {
//         const fileExt = path.extname(file.originalname); // .ext;
//         const fileName = path.basename(file.originalname, fileExt);
//         return cb(null, `${fileName}_${Date.now()}${fileExt}`);
//       },
//     }),
//   };
// }

@ApiTags('Part File API')
@Controller('part-file')
export class PartFileController {
  private readonly logger = new Logger(PartFileController.name);

  constructor(
    private partFileService: PartFileService,
    private configService: ConfigService,
  ) {}

  @Post('/upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: uploadPath,
  //       filename: function (req, file, cb) {
  //         const fileNameSplit = file.originalname.split('.');
  //         const fileExt = fileNameSplit.pop();
  //         cb(null, `${fileNameSplit}.${fileExt}.${Date.now()}`);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // 파일 처리 로직 추가

    // const partFile: PartFile = {
    //   originFileName: file.filename,
    //   destFileName: '',
    //   destPath: '',
    // };

    // this.partFileService.create(partFile);

    return Object.assign({
      resultCode: 0,
      resultMessage: 'Success',
      resultData: [],
    });
  }

  @Post('/uploads')
  // @UseInterceptors(
  //   FilesInterceptor('file', 3, {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: function (req, file, cb) {
  //         const fileName = file.originalname.split('.');
  //         const fileExt = fileName.pop();
  //         cb(null, `${fileName}.${fileExt}.${Date.now()}`);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(FilesInterceptor('file', 3))
  // @UseInterceptors(
  //   FilesInterceptor('file', 3, {
  //     dest: function (req, file, cb) {
  //       cb(null, PartController.FILE_PATH);
  //     },
  //     storage: diskStorage({
  //       // destination: PartController.FILE_PATH,
  //       filename: function (req, file, cb) {
  //         const fileName = file.originalname.split('.');
  //         const fileExt = fileName.pop();
  //         cb(null, `${fileName}.${fileExt}.${Date.now()}`);
  //       },
  //     }),
  //   }),
  // )
  // @UseInterceptors(FileInterceptor('file', getMulterOptions('./uploads')))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    // 파일 처리 로직 추가

    //   files.forEach((file) => {
    //     const partFile: PartFile = {
    //       originFileName: file.filename,
    //       destFileName: '',
    //       destPath: '',
    //     };

    //     this.partFileService.create(partFile);
    //   }

    // for (let i = 0; i < files.length; i++) {
    //   const partFile: PartFile = {
    //     originFileName: files[0].filename,
    //     destFileName: '',
    //     destPath: '',
    //   };
    //   this.partFileService.create(partFile);
    // }

    // files.forEach((file, index) => {});

    // files.map((file) => {
    //   const partFile: PartFile = {
    //     originFileName: file.filename,
    //     destFileName: '',
    //     destPath: '',
    //   };

    //   this.partFileService.create(partFile);
    // });

    const list = files.map((f) => {
      return {
        originFileName: f.originalname,
        destFileName: f.filename,
        destPath: f.destination,
        // updatedAt: new Date(),
      };
    });

    this.partFileService.upsert(list);

    // for (const file of files) {
    //   const partFile: PartFile = {
    //     originFileName: file.originalname,
    //     destFileName: file.filename,
    //     destPath: file.destination,
    //   };

    //   this.partFileService.create(partFile);
    // }

    // files.forEach((file) => {
    //   console.log(file);
    // });

    // for (const file of files) {
    //   const partFile: PartFile = {
    //     originFileName: files.filename,
    //     destFileName: '',
    //     destPath: '',
    //   };

    //   this.partFileService.create(partFile);
    // });

    // const partFile: PartFile = {
    //   originFileName: files.filename,
    //   destFileName: '',
    //   destPath: '',
    // };

    // this.partFileService.create(partFile);

    return Object.assign({
      resultCode: 0,
      resultMessage: 'Success',
      resultData: [],
    });
  }

  // @Get('download/:filename')
  // downloadFile(@Param('filename') filename: string, @Res() res: Response) {
  //   const filePath = path.join(
  //     __dirname,
  //     '..',
  //     '..',
  //     '..',
  //     'public',
  //     'uploads',
  //     filename,
  //   );

  //   // 파일 존재 여부 확인
  //   if (!fs.existsSync(filePath)) {
  //     throw new NotFoundException('파일을 찾을 수 없습니다.');
  //   }

  //   // 응답 헤더 설정
  //   res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  //   // 파일 스트림 생성 및 응답으로 보내기
  //   const fileStream = fs.createReadStream(filePath);
  //   fileStream.pipe(res);
  // }

  //   @Get()
  //   getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
  //     const file = fs.createReadStream(join(process.cwd(), 'package.json'));
  //     res.set({
  //       'Content-Type': 'application/json',
  //       'Content-Disposition': 'attachment; filename="package.json"',
  //     });
  //     return new StreamableFile(file);
  //   }

  //   // Or even:
  //   @Get()
  //   @Header('Content-Type', 'application/json')
  //   @Header('Content-Disposition', 'attachment; filename="package.json"')
  //   getStaticFile(): StreamableFile {
  //     const file = fs.createReadStream(join(process.cwd(), 'package.json'));
  //     return new StreamableFile(file);
  //   }

  @Get('/download/:filename')
  //   @Header('Content-Type', 'application/json')
  //   @Header('Content-Disposition', 'attachment; filename="package.json"')
  async downloadFile(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) response: Response, // Response -> import { Response } from 'express';
  ) {
    const file = await this.partFileService.getFileStream(filename);

    response.setHeader('Content-Type', 'application/json');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.fileName}"`,
    );

    return new StreamableFile(file.fileStream); // 👈 supports Buffer and Stream
    // file.fileStream.pipe(response);
  }
}
