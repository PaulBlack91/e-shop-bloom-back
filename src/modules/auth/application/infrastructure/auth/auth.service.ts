// application/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/application/repository/user.repository';
import { GoogleUser } from 'src/modules/user/application/dtos/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async handleGoogleLogin(googleUser: GoogleUser) {
    let user = await this.userRepository.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userRepository.create({
        name: googleUser.name,
        email: googleUser.email,
        provider: googleUser.provider,
      });
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}
