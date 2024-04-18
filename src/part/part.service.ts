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

  async findOne(id: number): Promise<Part> {
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

  async findOneByName(name: string): Promise<Part> {
    try {
      const part = await this.partRepository.findOne({ where: { name: name } });
      if (!part) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }
      return ResponsePartDto.convertFromPart([part])?.[0] || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async create(createPartDto: CreatePartDto): Promise<Part> {
    try {
      const result = await this.partRepository.save(createPartDto, {
        reload: true,
      });

      const created = await this.partRepository.findOne({
        where: { id: result.id },
      });

      return ResponsePartDto.convertFromPart([created])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const part = await this.partRepository.findOne({ where: { id } });
      if (!part) {
        throw new NotFoundException(`${id} Not Found.`);
      }

      await this.partRepository.delete({ id: id });

      return ResponsePartDto.convertFromPart([part])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async update(id: number, updatePart: UpdatePartDto) {
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
