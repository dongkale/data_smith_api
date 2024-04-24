import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { PartFile } from './part-file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';

@Injectable()
export class PartFileService {
  private readonly logger = new Logger(PartFileService.name);

  private readonly db__ = [
    {
      origin_name: 'pm2.json',
      dest_name: 'pm2_1713924529839.json',
    },
    {
      origin_name: 'README.d',
      dest_name: 'README_1713924529840.md',
    },
  ];

  constructor(
    @InjectRepository(PartFile)
    private readonly partRepository: Repository<PartFile>,
    private configService: ConfigService,
  ) {}

  async upsert(partFiles: PartFile[]) {
    try {
      //   const result = await this.partRepository.save(partFiles, {
      //     reload: true,
      //   });

      for (const file of partFiles) {
        file.updatedAt = new Date();
      }

      const result = await this.partRepository.upsert(partFiles, {
        skipUpdateIfNoValuesChanged: false,
        conflictPaths: ['originFileName'],
        upsertType: 'on-duplicate-key-update', // 'on-conflict-do-update',
      });

      //   const result = await this.partRepository
      //     .createQueryBuilder()
      //     .insert()
      //     .values(partFiles)
      //     .orUpdate({
      //       conflict_target: ['origin_file_name'],
      //       overwrite: ['dest_file_name', 'dest_path', 'updated_at'],
      //     })
      //     .execute();
      if (!result) {
        throw new Error('Create Part Failed');
      }
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async findOne(fileName: string): Promise<PartFile> {
    try {
      const partFile = await this.partRepository.findOne({
        where: { originFileName: fileName },
      });
      if (!partFile) {
        throw new NotFoundException(`"${partFile}" Not Found.`);
      }
      return partFile;

      // return this.mapper.map(user, UserDto, User);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //   async create(createPartDto: CreatePartDto): Promise<ResponsePartDto> {
  //     try {
  //       const result = await this.partRepository.save(createPartDto, {
  //         reload: true,
  //       });

  //       if (!result) {
  //         throw new Error('Create Part Failed');
  //       }

  //       const created = await this.partRepository.findOne({
  //         where: { id: result.id },
  //       });

  //       return ResponsePartDto.convertFromPart([created])?.[0] || null;
  //     } catch (error) {
  //       this.logger.debug(error);
  //       throw error;
  //     }
  //   }

  fileStream__(filename: string) {
    const dirPath =
      this.configService.get<string>('PART_FILE_UPLOAD_PATH') ||
      './common_uploads';

    const findData = this.db__.find((f) => f.origin_name === filename);
    if (!findData) {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }

    const filePath = join(
      process.cwd(),
      `/${dirPath}/`,
      `${findData.dest_name}`,
    );
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }

    return {
      fileStream: createReadStream(filePath),
      fileName: findData.origin_name,
    };
    // return createReadStream(join(process.cwd(), 'package.json'));
  }

  async getFileStream(fileName: string) {
    const partFile = await this.findOne(fileName);
    if (!partFile) {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }

    const partFilePath = join(
      process.cwd(),
      `/${partFile.destPath}/`,
      `${partFile.destFileName}`,
    );
    if (!fs.existsSync(partFilePath)) {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }

    return {
      fileStream: createReadStream(partFilePath),
      fileName: partFile.originFileName,
    };
  }
}
