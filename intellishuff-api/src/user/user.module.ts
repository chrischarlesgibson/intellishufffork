import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InstitutionModule } from 'src/institution/institution.module';
import { Institution } from 'src/institution/institution.entity';
import { HelperService } from 'src/universal/helper.service';
import { Role } from 'src/role/role/role.entity';
import { RoleService } from 'src/role/role/role.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from 'src/universal/app.constant';
import { TokenService } from './auth/token.service';
import { ExternalAuth } from './external-auth/external-auth.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Institution, Role, ExternalAuth]),
    JwtModule.register({
      secret: AppConstant.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION },
    }),
    InstitutionModule,
  ],
  controllers: [UserController],
  providers: [UserService, HelperService, TokenService],
  exports: [UserService],
})
export class UserModule {}
