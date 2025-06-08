export class CreateUserDto {
  name?: string;
  email?: string;
  provider: 'google' | 'facebook';
}

export class GoogleUser {
  name: string;
  email: string;
  provider: 'google';
}
