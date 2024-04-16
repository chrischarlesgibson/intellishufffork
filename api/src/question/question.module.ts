import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { Module } from '@nestjs/common';
import { HelperService } from 'src/universal/helper.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from 'src/universal/app.constant';
import { TokenService } from 'src/user/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    JwtModule.register({
      secret: AppConstant.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, HelperService, TokenService],
  exports: [QuestionService],
})
export class QuestionModule {}
