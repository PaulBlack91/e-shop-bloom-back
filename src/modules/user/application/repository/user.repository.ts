import { User } from '../../domain/user.domain';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  create(newUser: User): Promise<User>;
  findAll(options?: object): Promise<User[]>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  update(id: string, userUpdated: User): Promise<User | null>;
  delete(id: string): Promise<void>;
}
