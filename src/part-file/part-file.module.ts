import { Module } from '@nestjs/common';
import { PartFileService } from './part-file.service';
import { PartFileController } from './part-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerConfigService } from 'src/common/upload/multer.config';
import { PartFile } from './part-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartFileSubscriber } from './part-file.subscribe';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartFile]),
    // MulterModule.registerAsync({ useClass: MulterConfigService }),
    // MulterModule.register({
    //   dest: './uploads', // 파일이 업로드될 디렉토리 설정
    // }),

    // case 1
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const dirPath =
    //       configService.get('PART_FILE_UPLOAD_PATH') || './uploads'; //  path;

    //     fs.mkdirSync(dirPath, { recursive: true });

    //     return {
    //       storage: diskStorage({
    //         destination: async (req, file, cb) => {
    //           return cb(null, dirPath);
    //         },
    //         filename: (req, file, cb) => {
    //           const fileName = file.originalname.split('.');
    //           const fileExt = fileName.pop();
    //           return cb(null, `${fileName}_${Date.now()}${fileExt}`);
    //         },
    //       }),
    //     };
    //   },
    // }),

    // case 2
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     dest: configService.get<string>('MULTER_DEST'),
    //   }),
    //   inject: [ConfigService],
    // }),

    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dirPath =
          configService.get<string>('PART_FILE_UPLOAD_PATH') ||
          './common_uploads';

        return multerConfigService(dirPath);
      },
    }),
  ],
  controllers: [PartFileController],
  providers: [PartFileService, PartFileSubscriber],
})
export class PartFileModule {}
