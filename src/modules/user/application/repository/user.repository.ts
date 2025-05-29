import { User } from '../../domain/user.domain';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  create(newUser: Partial<Omit<User, 'id'>>): Promise<User>;
  findAll(options?: object): Promise<User[]>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  update(
    id: string,
    userUpdated: Partial<Omit<User, 'id'>>,
  ): Promise<User | null>;
  delete(id: string): Promise<void>;
}
