import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private frontendDomain = null;
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    this.frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
  }

  @Public()
  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any>{
    const { token, userData } = await this.authService.login(authDto);
    response.cookie('accessToken', token, { httpOnly: true, domain: this.frontendDomain });
    return userData;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken', { httpOnly: true, domain: this.frontendDomain });
  }
}