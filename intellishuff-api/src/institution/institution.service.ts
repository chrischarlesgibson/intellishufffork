import { InjectRepository } from "@nestjs/typeorm";
import { IInstitution } from "./institution.model";
import { Institution } from "./institution.entity";
import { Repository } from "typeorm";
import { IResponse } from "src/user/user.model";
import { Injectable } from "@nestjs/common";


@Injectable()
export class InstitutionService {
    /**
     *
     */
    constructor(
        @InjectRepository(Institution)
            private institutionRepo: Repository<Institution>,
    ) {   
    }

    async uploadLogo(inst, image) {
        const institution = await this.getInstById(inst.id) // Assuming you have a method to find the institution
    
        // Update the institution with the uploaded image buffer
        institution.image = image.buffer;
    
        await this.institutionRepo.save(institution);
    
        return { message: 'Image uploaded successfully' };
      }

    async addInstitution(args: IInstitution): Promise<IResponse> {
        if(!args) {
            return null;
        }

        await this.institutionRepo.save(args);

        return {
            status: true,
        }
    }

    async getInstById(id: number) {
        if(!id) {
            return null;
        }

        const inst = await this.institutionRepo.findOne({ where: { id: id }});

        return inst
    }
}