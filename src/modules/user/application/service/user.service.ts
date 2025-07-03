import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourseEntity } from '../../../course/infrastructure/persistence/entities/user-course.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserCourseEntity)
    private readonly userCourseRepository: Repository<UserCourseEntity>,
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
    return this.userRepository.findByEmail(email); // sin error
  }

  async create(user: CreateUserDto) {
    try {
      const createdUser = await this.userRepository.create(user);
      if (!createdUser) {
        throw new Error('Failed to create user');
      }
      return createdUser;
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

  async getPurchasedCourses(userId: string) {
    try {
      // Buscar todos los cursos comprados por el usuario
      const userCourses = await this.userCourseRepository.find({
        where: {
          userId: userId,
          hasAccess: true,
        },
        select: ['courseId'],
      });

      // Extraer solo los IDs de los cursos
      const purchasedCourses = userCourses.map((uc) => uc.courseId);

      // TODO: Determinar si tiene todos los cursos (por ahora hardcoded a 3)
      const totalCourses = 3; // Número total de cursos disponibles
      const hasAllCourses = purchasedCourses.length === totalCourses;

      return {
        purchasedCourses,
        hasAllCourses,
      };
    } catch (error) {
      console.error('Error getting purchased courses:', error);
      throw new Error(`Failed to get purchased courses for user ${userId}`);
    }
  }
}
