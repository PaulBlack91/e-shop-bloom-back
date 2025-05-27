import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.domain';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(options?: object): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(newUser: User): Promise<User> {
    const userEntity = this.userRepository.create(newUser);
    return this.userRepository.save(userEntity);
  }

  async update(id: string, userUpdated: User): Promise<User | null> {
    await this.userRepository.update(id, userUpdated);
    return this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
