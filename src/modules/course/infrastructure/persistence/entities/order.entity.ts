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
import { UserEntity } from '../../../../user/infrastructure/persistence/entities/user.entity';
import { CourseEntity } from './course.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export enum PaymentGateway {
  MERCADOPAGO = 'mercadopago',
  STRIPE = 'stripe',
}

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  courseId: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  // Precio al momento de la compra
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 3 })
  currency: string; // USD, ARS

  // Estado de la orden
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  // Pasarela de pago preferida
  @Column({
    type: 'enum',
    enum: PaymentGateway,
    nullable: true,
  })
  preferredGateway?: PaymentGateway;

  // Control de tiempo
  @Column({ nullable: true })
  expiresAt?: Date; // Para órdenes pendientes (30 minutos)

  @Column({ nullable: true })
  paidAt?: Date; // Cuando se completó el pago

  // Metadatos
  @Column({ type: 'json', nullable: true })
  metadata?: any; // Info adicional (IP, user agent, etc.)

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
