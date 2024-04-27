// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// import { JwtPayload } from './types';

// @Injectable()
// export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(config: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: config.get<string>('ACCESS_TOKEN_KEY'),
//     });
//   }

//   async validate(payload: JwtPayload) {
//     return payload;
//   }
// }
