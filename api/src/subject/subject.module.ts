import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from 'src/universal/app.constant';
import { TokenService } from 'src/user/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    JwtModule.register({
      secret: AppConstant.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, TokenService],
  exports: [SubjectService],
})
export class SubjectModule {}
