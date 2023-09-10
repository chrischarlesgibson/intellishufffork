import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { JwtAccessTokenStrategy } from './access-token.strategy';
import { JwtRefreshTokenStrategy } from './refresh-token.strategy';
import { JwtAccessTokenAuthGuard } from './access-token-auth.guard';

@Global()
@Module({
  imports: [],
  providers: [
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    { provide: APP_GUARD, useClass: JwtAccessTokenAuthGuard },
  ],
  // exports: [AuthService]
})
export class AuthModule {}
