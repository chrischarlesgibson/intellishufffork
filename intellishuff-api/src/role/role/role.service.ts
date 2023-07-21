import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/user/user.model';

@Injectable()
export class RoleService {

    /**
     *
     */
    constructor(
        @InjectRepository(Role)
            private roleRep: Repository<Role>
    ) {

    }

    async addRole(args): Promise<IResponse<any>> {
        if(!args.role) {
            return {
                status: false,
                message: 'Add role'
            };
        }

        const role = await this.findRoleByName(args.role);
        if(role) {
            return {
                status: false,
                message: 'Role already exist'
            }
        }
        args.role.toLowerCase();
        await this.roleRep.save<Role>(args);

        return {
            status: true,
            message: 'Successfully added'
        }
    }

    async getAll(): Promise<IResponse<any>> {
        const roles = await this.roleRep.find();

        
        return {
            data: roles,
            status: true
        }
    }

    async findRoleByName(args) {
        const role = await this.roleRep.findOne({ where: { role: args } });

        if(role) {
            return true;
        }

        return false;
    }

    async findRoles(roles?) {
        if(!roles) {
    
        }

        const role = await this.roleRep.find();
        return role;
    }
}
