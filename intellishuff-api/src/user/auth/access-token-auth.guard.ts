import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly userSvc: UserService,
    private readonly jwtSvc: JwtService,
    private readonly config: ConfigService
  ) {
    super();
  }
  
  async canActivate(context: ExecutionContext):  Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    
    if(!token) {
      throw new UnauthorizedException()
    }
    
    try {
      const payload = await this.jwtSvc.verifyAsync(token, {
        secret: this.config.get<string>('ACCESS_TOKEN_KEY')
      })
      
      req['user'] = payload;
    } catch (error) {
      throw new HttpException(error, 401);
    }

    return true;
  }

  private extractToken(request: any) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; 
    
    return type === 'Bearer' ? token : undefined; 
  }


  // async canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride('allow-any', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);

  //   if (isPublic) {
  //     try {
  //       //set the current user in request
  //       await super.canActivate(context); //this will call handleRequest()
  //     } catch (e) {} //ignore if fails for public apis
  //   } else {
  //     await super.canActivate(context); //this will call handleRequest()
  //   }

  //   const req = context.switchToHttp().getRequest();
  //   const cu = req.user ? { ...(<JwtPayload>req.user) } : null; //req.user will be set by handleRequest()
  //   if (cu) {
  //     //validate
  //     const user = await this.userSvc.getUserByEmail(cu.email);
  //     if (!user) {
  //       req.user = null;
  //     }

  //     if (user?.status !== UserStatus.APPROVED) {
  //       req.user = null;
  //     }
  //   }

  //   //token has a user but the user doesn't exist in our db or isn't approved
  //   if (cu && req.user == null) {
  //     throw new UnauthorizedException();
  //   }

  //   return true;
  // }

  // handleRequest(err, user, info, context) {
  //   if (user) return user;

  //   const error = info && Object.keys(info).length > 0 ? info : undefined;
  //   throw new UnauthorizedException(error);
  // }
}
