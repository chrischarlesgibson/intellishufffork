import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { RoleService } from './role.service';

@Controller(`${AppConstant.ROUTE_PREFIX}/role`)
export class RoleController {
    /**
     *
     */
    constructor(
        private roleSvc: RoleService
    ) {
        
    }

    @Post('addRole')
    async addRole(@Body() args: any) {
        return  this.roleSvc.addRole(args);
    }

    @Get('getAll')
    async getAll() {
        return this.roleSvc.getAll();
    }

}
