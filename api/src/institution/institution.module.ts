import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './Institution.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from 'src/universal/app.constant';
import { TokenService } from 'src/user/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),
    JwtModule.register({
      secret: AppConstant.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService, TokenService],
  exports: [InstitutionService],
})
export class InstitutionModule {}
