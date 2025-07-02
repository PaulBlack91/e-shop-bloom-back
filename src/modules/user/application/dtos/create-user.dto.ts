import { AuthProvider } from '../../domain/user.domain';

export class CreateUserDto {
  name: string;
  email: string;
  provider: AuthProvider;
  providerId?: string;
  password?: string; // Para registro local
}

export class GoogleUser {
  name: string;
  email: string;
  provider: AuthProvider.GOOGLE;
  providerId: string; // Google ID
}

export class LocalUserDto {
  name: string;
  email: string;
  password: string;
}
