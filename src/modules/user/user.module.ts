import { Module, Provider } from '@nestjs/common';
import { USER_REPOSITORY } from './application/repository/user.repository';
import { UserTypeOrmRepository } from './infrastructure/persistence/user.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserController } from './interface/user.controller';
import { UserService } from './application/service/user.service';

const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserTypeOrmRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, userRepositoryProvider],
  exports: [UserService, userRepositoryProvider],
})
export class UserModule {}
