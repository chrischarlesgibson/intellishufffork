import { Body, Controller, Post } from "@nestjs/common";
import { AppConstant } from "src/universal/app.constant";
import { IInstitution } from "./institution.model";
import { InjectRepository } from "@nestjs/typeorm";
import { InstitutionService } from "./Institution.service";

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

}