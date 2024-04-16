import { Injectable } from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  /**
   *
   */
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  generateRefreshToken(payLoad: JwtPayload) {
    const refreshToken = this.jwtService.sign(payLoad, {
      expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION,
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
    });

    return refreshToken;
  }

  generateAccessToken(payLoad: JwtPayload) {
    const accessToken = this.jwtService.sign(payLoad, {
      expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION,
      secret: this.config.get<string>('ACCESS_TOKEN_KEY'),
    });

    return accessToken;
  }
}
