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
} from '@nestjs/common';
import { PartService } from './part.service';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePartDto, UpdatePartDto, ResponsePartDto } from './dto/part.dto';
import { CustomResponseDto } from '../common/response/custom-response.dto';
import { ApiOkCustomResponse } from '../common/response/custom-response';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@ApiSecurity('X-API-KEY')
@Controller('part')
@ApiTags('Part API')
export class PartController {
  private readonly logger = new Logger(PartController.name);

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
}
