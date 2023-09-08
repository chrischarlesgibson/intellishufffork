import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { ISubject } from './subject.model';
import { SubjectService } from './subject.service';

@Controller(`${AppConstant.ROUTE_PREFIX}/subject`)
export class SubjectController {
  /**
   *
   */
  constructor(private subjectSvc: SubjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('updateSubject')
  async updateSubject(@Body() args: ISubject) {
    return this.subjectSvc.updateSubject(args);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getAllSubjects')
  async getAllSubjects() {
    return this.subjectSvc.getAllSubjects();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('addSubject')
  async addSubject(@Body() args: ISubject) {
    return this.subjectSvc.addSubject(args);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('deleteSubject')
  async deleteSubject(@Body() args: ISubject) {
    return this.subjectSvc.deleteSubject(args);
  }
}
