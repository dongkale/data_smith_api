import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'part_files' })
export class PartFile {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id?: number;

  @Column({ unique: true })
  @ApiProperty({ description: '원래 화일명' })
  originFileName: string;

  @Column()
  @ApiProperty({ description: '저장 대상 경로' })
  destPath: string;

  @Column()
  @ApiProperty({ description: '저장 대상 화일명' })
  destFileName: string;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일' })
  createdAt?: Date = new Date();

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ description: '갱신일' })
  updatedAt?: Date;
}
