import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

export enum ContentType {
  VIDEO = 'video',
  PDF = 'pdf',
}

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  courseId: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ContentType,
  })
  type: ContentType;

  // Archivo
  @Column({ length: 500 })
  fileUrl: string;

  @Column({ length: 255 })
  fileName: string;

  @Column({ type: 'bigint' })
  fileSize: number; // en bytes

  // Específico para videos
  @Column({ type: 'int', nullable: true })
  duration?: number; // en segundos, solo para videos

  // Orden y estado
  @Column({ type: 'int', default: 1 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
