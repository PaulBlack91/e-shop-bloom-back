export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export class User {
  id: string;
  email: string;
  name: string;
  password?: string; // Solo para auth local

  // Autenticación
  provider: AuthProvider;
  providerId?: string; // ID del proveedor (Google ID, Facebook ID)
  isEmailVerified: boolean;

  // Role (asignación manual por admin)
  role: UserRole;

  lastLogin?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
