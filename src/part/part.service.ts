import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './part.entity';
import { CreatePartDto, ResponsePartDto, UpdatePartDto } from './dto/part.dto';

@Injectable()
export class PartService {
  private readonly logger = new Logger(PartService.name);

  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
  ) {}

  async findAll(): Promise<ResponsePartDto[]> {
    try {
      const parts = await this.partRepository.find();

      return ResponsePartDto.convertFromPart(parts);
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async findOne(name: string): Promise<Part> {
    try {
      const part = await this.partRepository.findOne({ where: { name } });
      // .then((res) => {
      //   console.log('res', res);
      //   return {
      //     id: res.id,
      //     name: res.name,
      //     description: res.description,
      //     dataJson: JSON.stringify(res.dataJson),
      //     createdAt: res.createdAt,
      //     updatedAt: res.updatedAt,
      //   };
      // });
      if (!part) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }
      return ResponsePartDto.convertFromPart([part])?.[0] || null;

      // return this.mapper.map(user, UserDto, User);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async create(createPartDto: CreatePartDto): Promise<ResponsePartDto> {
    try {
      const result = await this.partRepository.save(createPartDto, {
        reload: true,
      });

      if (!result) {
        throw new Error('Create Part Failed');
      }

      const created = await this.partRepository.findOne({
        where: { id: result.id },
      });

      return ResponsePartDto.convertFromPart([created])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async remove(name: string) {
    try {
      const part = await this.partRepository.findOne({ where: { name } });
      if (!part) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }

      await this.partRepository.delete({ name: name });

      return ResponsePartDto.convertFromPart([part])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async update(name: string, updatePart: UpdatePartDto) {
    try {
      const part = await this.partRepository.findOne({ where: { name } });
      if (!part) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }

      // Subscriber Update 가 발생하지 않음, update 보다 많은 리소스를 사용함
      // await this.partRepository.save({
      //   ...part,
      //   ...updatePart,
      // });

      await this.partRepository.update(part.id, updatePart);

      const updated = await this.partRepository.findOne({ where: { name } });

      return ResponsePartDto.convertFromPart([updated])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async findOneById(id: number): Promise<Part> {
    try {
      const part = await this.partRepository.findOne({ where: { id } });
      if (!part) {
        throw new NotFoundException(`"${id}" Not Found.`);
      }
      return ResponsePartDto.convertFromPart([part])?.[0] || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateById(id: number, updatePart: UpdatePartDto) {
    try {
      const part = await this.partRepository.findOne({ where: { id } });
      if (!part) {
        throw new NotFoundException(`${id} Not Found.`);
      }

      await this.partRepository.save({
        ...part,
        ...updatePart,
      });

      const updated = await this.partRepository.findOne({ where: { id } });

      return ResponsePartDto.convertFromPart([updated])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }
}
