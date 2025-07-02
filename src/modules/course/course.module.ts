import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './infrastructure/persistence/entities/course.entity';
import { ContentEntity } from './infrastructure/persistence/entities/content.entity';
import { OrderEntity } from './infrastructure/persistence/entities/order.entity';
import { UserCourseEntity } from './infrastructure/persistence/entities/user-course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      ContentEntity,
      OrderEntity,
      UserCourseEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class CourseModule {}
