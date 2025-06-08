import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './application/strategies/google.strategy';
import { AuthService } from './application/infrastructure/auth/auth.service';
import { AuthController } from './interface/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module'; // importante importar UserModule si usa UserRepository

@Module({
  imports: [
    PassportModule,
    ConfigModule, // necesario para usar ConfigService
    UserModule, // necesario para que el userRepository funcione
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
