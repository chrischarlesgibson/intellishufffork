import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { IQuestion, IQuestionFilter } from './question.model';
import { QuestionService } from './question.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessTokenAuthGuard } from 'src/user/auth/access-token-auth.guard';

@Controller(`${AppConstant.ROUTE_PREFIX}/question`)
export class QuestionController {
  /**
   *
   */
  constructor(private questionSvc: QuestionService) {}

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('generateQuizResult')
  async generateQuizResult(@Body() args: IQuestion) {
    await this.questionSvc.generateQuizResult(args);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('filterQuestions')
  async filterQuestions(@Body() args: IQuestionFilter) {
    return await this.questionSvc.filterQuestions(args);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getAllQuestions')
  async getAllQuestions() {
    return await this.questionSvc.getAllQuestions();
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('addQuestion')
  async addQuestion(@Body() args: IQuestion) {
    return await this.questionSvc.addQuesition(args);
  }
}
