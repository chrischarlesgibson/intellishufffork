import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { Module } from '@nestjs/common';
import { HelperService } from 'src/universal/helper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService, HelperService],
  exports: [QuestionService],
})
export class QuestionModule {}
