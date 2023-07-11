import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { Repository } from "typeorm";
import { IResponse } from "src/user/user.model";

@Injectable()
export class SubjectService {
    /**
     *
     */
    constructor(
        @InjectRepository(Subject) 
            private subjectRepo: Repository<Subject>
    ) {
        
    }

    async findById(args ) {
        if(!args) {
            return;
        }

        return await this.subjectRepo.findOne(args.id);
    }

    async addSubject(args ): Promise<IResponse<any>> {
        if(!args) {
            return;
        }

        const subjectExist = await this.subjectRepo.findOne({ where: { name: args.name } });
        if(subjectExist) {
            return {
                message: 'Subject already Exist',
                status: false
            };
        }

        await this.subjectRepo.save<Subject>(args);
        return {
            message: `successfully added ${args.name} as subject`,
            status: true
        };
    }

    async getAllSubjects() {
        const subs = await this.subjectRepo.find();

        if(!subs) {
            return null
        }
        return subs;
    }
}