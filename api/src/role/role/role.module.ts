import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from 'src/universal/app.constant';
import { TokenService } from 'src/user/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    JwtModule.register({
      secret: AppConstant.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService, TokenService],
  exports: [RoleService],
})
export class RoleModule {}
