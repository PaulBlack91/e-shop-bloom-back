import { User } from '../../domain/user.domain';
import { CreateUserDto } from 'src/modules/user/application/dtos/create-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  create(newUser: CreateUserDto): Promise<User>;
  findAll(options?: object): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(
    id: string,
    userUpdated: Partial<Omit<User, 'id'>>,
  ): Promise<User | null>;
  delete(id: string): Promise<void>;
}
