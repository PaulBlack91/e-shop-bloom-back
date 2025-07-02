import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../user/application/service/user.service';
import { AuthProvider } from '../../../user/domain/user.domain';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  // Método async para manejar operaciones de base de datos
  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      if (!profile) {
        return done(new Error('No profile data received from Google'), false);
      }

      const { name, emails } = profile;
      const email = emails?.[0]?.value;

      if (!email) {
        return done(new Error('No email received from Google'), false);
      }

      // Buscar usuario existente por email
      let user = await this.userService.findByEmail(email);

      // Si no existe, crear nuevo usuario
      if (!user) {
        const newUserData = {
          name: name?.givenName + ' ' + name?.familyName,
          email: email,
          provider: AuthProvider.GOOGLE,
        };

        user = await this.userService.create(newUserData);
      }

      // Retornar el usuario (existente o recién creado)
      done(null, user);
    } catch (error) {
      console.error('Error in Google strategy validation:', error);
      done(error, false);
    }
  }
}
