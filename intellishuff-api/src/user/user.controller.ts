import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  IRegistrationParams,
  IResponse,
  IUser,
  UserStatus,
} from './user.model';
import { AppConstant } from 'src/universal/app.constant';
import { InstitutionService } from 'src/institution/Institution.service';
import { JwtAccessTokenAuthGuard } from './auth/access-token-auth.guard';
import { JwtPayload } from './auth/types';
import { TokenService } from './auth/token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller(`${AppConstant.ROUTE_PREFIX}/user`)
export class UserController {
  /**
   *
   */
  constructor(
    private config: ConfigService,
    private jwtSvc: JwtService,
    private userSvc: UserService,
    private institutionSvc: InstitutionService,
    private tokenSvc: TokenService
  ) {}

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sendMail')
  async sendMail(@Body() args: { to; subject }) {
    const resp = await this.userSvc._sendMail(args.to, args.subject);
    if (resp.accepted) {
      return {
        message: `Email has been sent to ${args.to}`,
      };
    }
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('changeRole')
  async changeRole(@Body() args: { user: IUser; role: any }) {
    if (!args.user && !args.role) {
      return;
    }

    return await this.userSvc.changeRole(args.user, args.role);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('changeStatus')
  async changeStatus(@Body() args: { user: IUser; status: UserStatus }) {
    if (!args.user && !args.status) {
      return;
    }

    return await this.userSvc.changeStatus(args.user, args.status);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getAllUsers')
  async getALlUsers() {
    const users = await this.userSvc.getAllUsers();
    return users;
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getCurrentUser')
  async getCurrentUser(@Request() req,  @Query('id') id: number) { 
    const user = await this.userSvc.getCurrentUser(id);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('generateAccessToken')
  async generateAccessToken(@Body() args) { 
    try {
      const payload = await this.jwtSvc.verifyAsync(args.args, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET')
      });

    const accessToken = await this.tokenSvc.generateAccessToken({userId: payload.userId, email: payload.email});
    const refresh_Token = await this.tokenSvc.generateRefreshToken({userId: payload.userId, email: payload.email});

    return{
      access_token: accessToken,
      refresh_token: refresh_Token
    };
    
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() args) {
    const resp = await this.userSvc.login(args);

    return resp;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() args: IRegistrationParams) {
    const resp = await this.userSvc.register(args);

    return resp;
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('updateTourStatus')
  async updateTourStatus(@Body() args: IUser) {
    console.log(args);

    await this.userSvc.updateTourStatus(args);
  }
}
