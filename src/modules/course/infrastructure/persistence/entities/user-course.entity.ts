import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../../../user/infrastructure/persistence/entities/user.entity';
import { CourseEntity } from './course.entity';
import { OrderEntity } from './order.entity';

@Entity('user_course')
@Unique(['userId', 'courseId']) // Un usuario no puede comprar el mismo curso dos veces
export class UserCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  courseId: string;

  @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @Column('uuid', { nullable: true })
  orderId?: string;

  @ManyToOne(() => OrderEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'orderId' })
  order?: OrderEntity;

  // Acceso de por vida - simple
  @Column({ default: true })
  hasAccess: boolean; // Solo para casos extremos (suspender usuario)

  // Metadatos simples
  @Column({ type: 'int', default: 0 })
  accessCount: number; // Cuántas veces accedió

  @Column({ nullable: true })
  lastAccessedAt?: Date; // Última vez que accedió

  // Timestamps
  @CreateDateColumn()
  purchasedAt: Date; // Momento de la compra

  @UpdateDateColumn()
  updatedAt: Date;
}
