import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  // luego agregar async await cuando tenga la base de datos
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): any {
    const { name, emails } = profile;

    const user = {
      name: name?.givenName + ' ' + name?.familyName,
      email: emails?.[0]?.value ?? '',
      provider: 'google',
    };

    done(null, user);
  }
}
