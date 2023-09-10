import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';
import { RoleService } from './role.service';
import { JwtAccessTokenAuthGuard } from 'src/user/auth/access-token-auth.guard';

@Controller(`${AppConstant.ROUTE_PREFIX}/role`)
export class RoleController {
  /**
   *
   */
  constructor(private roleSvc: RoleService) {}

  @UseGuards(JwtAccessTokenAuthGuard)
  @Post('addRole')
  async addRole(@Body() args: any) {
    return this.roleSvc.addRole(args);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Get('getAll')
  async getAll() {
    return this.roleSvc.getAll();
  }
}
