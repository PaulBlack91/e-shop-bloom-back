// infrastructure/auth/controllers/auth.controller.ts
import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../application/service/auth.service';
import { GoogleUser } from 'src/modules/user/application/dtos/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: { user: GoogleUser },
    @Res() res: Response,
  ) {
    const result = await this.authService.handleGoogleLogin(req.user);

    // Redireccionar al frontend con el token y datos del usuario
    const token = result.access_token;
    const userData = encodeURIComponent(JSON.stringify(result.user));
    const redirectUrl = `http://localhost:5174/auth/callback?token=${token}&user=${userData}`;

    return res.redirect(redirectUrl);
  }
}
