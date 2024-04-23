import {
  Controller,
  Get,
  Post,
  Logger,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  Res,
} from '@nestjs/common';
import { PartService } from './part.service';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePartDto, UpdatePartDto, ResponsePartDto } from './dto/part.dto';
import { CustomResponseDto } from '../common/response/custom-response.dto';
import { ApiOkCustomResponse } from '../common/response/custom-response';
import { AuthGuard } from '@nestjs/passport';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import path from 'path';

// const storage = diskStorage({
//   destination: './uploads',
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname); // .ext;
//     const fileName = path.basename(file.originalname, fileExt);
//     return cb(null, `${fileName}_${Date.now()}${fileExt}`);
//   },
// });

@ApiSecurity('X-API-KEY')
@Controller('part')
@ApiTags('Part API')
export class PartController {
  private readonly logger = new Logger(PartController.name);
  static readonly __l__ = ConfigService;

  static readonly FILE_PATH = './part_uploads__';
  readonly T_FILE_PATH = './part_uploads__';

  constructor(
    private partService: PartService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '데이터 리스트 요청 API',
    description: '데이터 리스트 요청한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Get()
  async findAll() {
    const findAll = await this.partService.findAll();

    return Object.assign({
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: findAll,
    });
  }

  @ApiOperation({
    summary: '지정 name 데이터 요청 API',
    description: '지정 name 데이터를 요청한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Get(':name')
  async findOne(@Param('name') name: string) {
    const find = await this.partService.findOne(name);

    return Object.assign({
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: find ? [find] : [],
    });
  }

  @ApiOperation({
    summary: '지정 데이터 생성 API',
    description: '지정 데이터를 생성한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Post()
  async create(@Body() createPart: CreatePartDto) {
    const create = await this.partService.create(createPart);

    return Object.assign({
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: create,
    });
  }

  @ApiOperation({
    summary: '지정 데이터 삭제 API',
    description: '지정 데이터를 삭제한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Delete(':name')
  async remove(@Param('name') name: string) {
    const remove = await this.partService.remove(name);

    return Object.assign({
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: remove,
    });
  }

  @ApiOperation({
    summary: '지정 데이터 수정 API',
    description: '지정 데이터를 수정한다.',
  })
  @ApiOkCustomResponse(ResponsePartDto)
  @UseGuards(AuthGuard('api-key'))
  @Put(':name')
  async update(@Param('name') name: string, @Body() updatePart: UpdatePartDto) {
    const update = await this.partService.update(name, updatePart);

    return Object.assign({
      resultCode: CustomResponseDto.SUCCESS_CODE,
      resultMessage: CustomResponseDto.SUCCESS_STRING,
      resultData: update,
    });
  }

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
  async uploadFiles(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
    // 파일 처리 로직 추가
  }

  @Get(':path/:name')
  async download(
    @Res() res: Response,
    @Param('path') path: string,
    @Param('name') name: string,
    @Query('fn') fileName,
  ) {
    // res.download(
    //   `${this.config.get('ATTACH_SAVE_PATH')}/${path}/${name}`,
    //   fileName,
    // );
  }
}
