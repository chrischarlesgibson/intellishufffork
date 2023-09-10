import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { IInstitution } from './institution.model';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionService } from './Institution.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessTokenAuthGuard } from 'src/user/auth/access-token-auth.guard';

@Controller(`${AppConstant.ROUTE_PREFIX}/institution`)
export class InstitutionController {
  /**
   *
   */
  constructor(private institutionSvc: InstitutionService) {}

  @UseGuards(JwtAccessTokenAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('addInstitution')
  async addInstitution(@Body() args: IInstitution) {
    await this.institutionSvc.addInstitution(args);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Post('uploadLogo')
  @UseInterceptors(FileInterceptor('image') )
  async uploadLogo(@UploadedFile() image: Express.Multer.File) {
    // await this.institutionSvc.uploadLogo(args, image);
    console.log('as', image)

  }
}
