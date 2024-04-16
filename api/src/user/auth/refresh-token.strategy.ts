// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { ForbiddenException, Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import { ConfigService } from '@nestjs/config';

// import { JwtPayload, JwtPayloadWithRefreshToken } from './types';

// @Injectable()
// export class JwtRefreshTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh',
// ) {
//   constructor(config: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: config.get<string>('REFRESH_TOKEN_KEY'),
//       passReqToCallback: true, //pass the refresh token back to the request. Do not destroy as we need it in validate
//     });
//   }

//   validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
//     const refreshToken = req?.get('authorization')?.split(' ')[1];
//     if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

//     return {
//       ...payload,
//       refreshToken,
//     };
//   }
// }
