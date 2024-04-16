import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { ISubject } from './subject.model';
import { SubjectService } from './subject.service';
import { JwtAccessTokenAuthGuard } from 'src/user/auth/access-token-auth.guard';

@Controller(`${AppConstant.ROUTE_PREFIX}/subject`)
export class SubjectController {
  /**
   *
   */
  constructor(private subjectSvc: SubjectService) {}

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('updateSubject')
  async updateSubject(@Body() args: ISubject) {
    return this.subjectSvc.updateSubject(args);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getAllSubjects')
  async getAllSubjects() {
    return this.subjectSvc.getAllSubjects();
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('addSubject')
  async addSubject(@Body() args: ISubject) {
    return this.subjectSvc.addSubject(args);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('deleteSubject')
  async deleteSubject(@Body() args: ISubject) {
    return this.subjectSvc.deleteSubject(args);
  }
}
