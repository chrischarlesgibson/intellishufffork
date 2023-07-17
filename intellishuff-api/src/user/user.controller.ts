import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { IRegistrationParams, IResponse, IUser,  UserStatus } from './user.model';
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

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('sendMail')
    async sendMail(@Body() args: { to, subject }) {
        const resp = await this.userSvc._sendMail(args.to, args.subject);
        if(resp.accepted) {
            return {
                message: `Email has been sent to ${args.to}`
            }
        }
        
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('changeRole')
    async changeRole(@Body() args: { user: IUser, role: any }) {
        if( !args.user && !args.role) { 
            return;
        }
        
        return await this.userSvc.changeRole(args.user, args.role);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('changeStatus')
    async changeStatus(@Body() args: { user: IUser, status: UserStatus }) {
        if( !args.user && !args.status) { 
            return;
        }
        
        return await this.userSvc.changeStatus(args.user, args.status);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('getAllUsers')
    async getALlUsers() {
        const users = await this.userSvc.getAllUsers(); 
        return users;
    }
 
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('getCurrentUser')
    async getCurrentUser(@Query('id') id: number) {
        const user = await this.userSvc.getCurrentUser(id);
        
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body() args) {
        const resp = await this.userSvc.login(args); 

        return resp;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() args: IRegistrationParams) {
        
       const resp = await this.userSvc.register(args);

       return resp;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('updateTourStatus')
    async updateTourStatus(@Body() args: IUser) {
        console.log(args);
        
        await this.userSvc.updateTourStatus(args)
    }
}
