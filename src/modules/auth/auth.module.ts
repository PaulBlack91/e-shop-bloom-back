import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './application/strategies/google.strategy';
import { AuthService } from './application/infrastructure/auth/auth.service';
import { AuthController } from './interface/auth/auth.controller';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
