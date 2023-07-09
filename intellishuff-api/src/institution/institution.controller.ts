import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AppConstant } from "src/universal/app.constant";
import { IInstitution } from "./institution.model";
import { InjectRepository } from "@nestjs/typeorm";
import { InstitutionService } from "./Institution.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller(`${AppConstant.ROUTE_PREFIX}/institution`)
export class InstitutionController {

    /**
     *
     */
    constructor(
        private institutionSvc: InstitutionService
    ) {
    }

    @Post('addInstitution')
    async addInstitution(@Body()  args: IInstitution) {
        await this.institutionSvc.addInstitution(args);
    }

    @Post('uploadLogo')
    @UseInterceptors(FileInterceptor('image'))
    async uploadLogo(@Body() args: IInstitution, @UploadedFile() image) {
        await this.institutionSvc.uploadLogo(args, image);
    }

}