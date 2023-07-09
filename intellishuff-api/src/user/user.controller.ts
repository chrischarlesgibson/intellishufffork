import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { IRegistrationParams, IResponse, IUser, UserRole, UserStatus } from './user.model';
import { AppConstant } from 'src/universal/app.constant';
import { InstitutionService } from 'src/institution/Institution.service';

@Controller(`${AppConstant.ROUTE_PREFIX}/user`)
export class UserController {
    /**
     *
     */
    constructor(private userSvc: UserService
        , private institutionSvc: InstitutionService) {
        
    }


    @Post('sendMail')
    async sendMail(@Body() args: { to, subject }) {
        const resp = await this.userSvc._sendMail(args.to, args.subject);
        if(resp.accepted) {
            return {
                message: `Email has been sent to ${args.to}`
            }
        }
        
    }
    
    @Post('changeRole')
    async changeRole(@Body() args: { user: IUser, role: UserRole }) {
        if( !args.user && !args.role) { 
            return;
        }
        
        return await this.userSvc.changeRole(args.user, args.role);
    }

    @Post('changeStatus')
    async changeStatus(@Body() args: { user: IUser, status: UserStatus }) {
        if( !args.user && !args.status) { 
            return;
        }
        
        return await this.userSvc.changeStatus(args.user, args.status);
    }

    @Get('getAllUsers')
    async getALlUsers() {
        const users = await this.userSvc.getAllUsers(); 
        return users;
    }
 
    @Get('getCurrentUser')
    async getCurrentUser(@Query('id') id: number) {
        const user = await this.userSvc.getCurrentUser(id);
        
        return user;
    }

    @Post('login')
    async login(@Body() args) {
        const resp = await this.userSvc.login(args); 

        return resp;
    }

    @Post('register')
    async register(@Body() args: IRegistrationParams) {
       const resp = await this.userSvc.register(args);

    //    if(resp.status) {
    //     await  this.institutionSvc.addInstitution(args.institution);
    //    }
       
       return resp;
    }

    @Post('updateTourStatus')
    async updateTourStatus(@Body() args: IUser) {
        console.log(args);
        
        await this.userSvc.updateTourStatus(args)
    }
}
