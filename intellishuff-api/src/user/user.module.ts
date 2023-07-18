import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InstitutionModule } from 'src/institution/institution.module';
import { Institution } from 'src/institution/institution.entity';
import { HelperService } from 'src/universal/helper.service';
import { Role } from 'src/role/role/role.entity';
import { RoleService } from 'src/role/role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Institution, Role]),
    InstitutionModule
  ],
  controllers: [UserController],
  providers: [UserService, HelperService],
  exports: [UserService]

})
export class UserModule {}
