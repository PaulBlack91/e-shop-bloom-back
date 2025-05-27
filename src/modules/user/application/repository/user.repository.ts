import { User } from '../../domain/user.domain';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  create(newUser: User): Promise<User>;
  findAll(options?: object): Promise<User[]>;
  findOne(id?: string, email?: string): Promise<User>;
  update(id: string, userUpdated: User): Promise<User>;
  delete(id: string): Promise<void>;
}
