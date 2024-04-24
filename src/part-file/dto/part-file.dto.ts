import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  Transform,
  Type,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { JsonStringCheck } from '../../common/decorators/json-string-check';
import { PartFile } from '../part-file.entity';
