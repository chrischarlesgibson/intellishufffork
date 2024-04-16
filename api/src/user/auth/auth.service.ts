// import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as argon from 'argon2';

// import { UserService } from '../user.service';
// import * as moment from 'moment';
// import { User } from '../user.entity';
// import { ConfigService } from '@nestjs/config';
// import { JwtPayload, JwtPayloadWithRefreshToken } from './types';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userSvc: UserService,
//     private jwtService: JwtService, private tokenSvc: TokenService
//     , private readonly config: ConfigService
//   ) {}

//   validateUserByUsername(username: string, password: string): Promise<any> {
//     return this.userSvc.validateUserByUsername({ username: username, password });
//   }

//   async register(model: IRegistrationParams) {
//     const response = await this.userSvc.register(model);
//     //do not return token info when user is registering through normal registration form
//     if(response.data && model.externalAuth) {
//       const data = await this.login(response.data, model.deviceUuid, model.loginType);
//       response.data = data;
//     } else {
//       response.data = true;
//     }
//     return response;
//   }

//   async login(user: User, deviceUuid, loginType: LoginType) {
//     const payload: JwtPayload = { username: user.mobile, userId: user.id, loginType: loginType };

//     const token = this.jwtService.sign(payload
//       , { expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION, secret: this.config.get<string>('ACCESS_TOKEN_KEY') });
//     const refreshToken = this.jwtService.sign(payload
//       , { expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION , secret: this.config.get<string>('REFRESH_TOKEN_SECRET') });

//     const rtHash = await this.tokenSvc.generateRefreshTokenHash(refreshToken);
//     //save
//     await this.tokenSvc.createOrUpdate({
//       id: undefined,
//       userId: user.id,
//       username: user.mobile,
//       deviceUuid: deviceUuid,
//       refreshTokenHash: rtHash
//     });

//     const userModel = await this.userSvc.prepareUser(user);
//     return {
//       access_token: token,
//       refresh_token: refreshToken,
//       ...userModel,
//       id: undefined
//     };
//   }

//   async refreshTokens(cu: JwtPayloadWithRefreshToken, deviceUuid: string) {
//     const user = await this.userSvc.findOne(cu.userId);
//     if (!user) throw new HttpException({ name: 'RefreshTokenExpiredError' }, HttpStatus.UNAUTHORIZED);

//     const token = await this.tokenSvc.findByDeviceUuid(deviceUuid);
//     if (!token || !token?.refreshTokenHash) throw new HttpException({ name: 'RefreshTokenExpiredError' }, HttpStatus.UNAUTHORIZED);

//     const match = await argon.verify(token.refreshTokenHash, cu.refreshToken);
//     if (!match) throw new HttpException({ name: 'RefreshTokenExpiredError' }, HttpStatus.UNAUTHORIZED);

//     const response = await this.login(user, deviceUuid, cu.loginType);
//     return response;
//   }

//   async logout(deviceUuid) {
//     const token = await this.tokenSvc.findByDeviceUuid(deviceUuid);
//     if(token) {
//       token.refreshTokenHash = null;
//       await this.tokenSvc.createOrUpdate(token);
//     }

//     return true;
//   }
// }
