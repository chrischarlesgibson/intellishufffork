import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppConstant } from "src/universal/app.constant";
import { ISubject } from "./subject.model";
import { SubjectService } from "./subject.service";

@Controller(`${AppConstant.ROUTE_PREFIX}/subject`)
export class SubjectController {

    /**
     *
     */
    constructor(
        private subjectSvc: SubjectService
    ) {
        
    }

    @Get('getAllSubjects')
    async getAllSubjects( ) {
        return await this.subjectSvc.getAllSubjects();
    }

    @Post('addSubject')
    async addSubject(@Body() args: ISubject ) {
        return await this.subjectSvc.addSubject(args);
    }


}