import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    try {
      const response = await this.userRepository.findById(id);
      if (!response) {
        throw new Error(`User with ID ${id} not found`);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async findByEmail(email: string) {
    const response = await this.userRepository.findByEmail(email);
    if (!response) {
      throw new Error(`User with email ${email} not found`);
    }
    return response;
  }

  async create(user: CreateUserDto) {
    try {
      return this.userRepository.create(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      return this.userRepository.update(id, user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error(`Failed to update user with ID ${id}`);
    }
  }

  async delete(id: string) {
    try {
      return this.userRepository.delete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error(`Failed to delete user with ID ${id}`);
    }
  }
}
