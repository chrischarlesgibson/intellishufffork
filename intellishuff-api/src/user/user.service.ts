import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ILoginParams,
  IRegistrationParams,
  IResponse,
  IRole,
  IUser,
  UserStatus,
} from './user.model';
import { MailerService } from '@nestjs-modules/mailer';
import { AppConstant } from 'src/universal/app.constant';
import { User } from './user.entity';
import { HelperService } from 'src/universal/helper.service';

import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  /**
   *
   */
  userStatus = UserStatus;
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private mailerService: MailerService,
    private helperSvc: HelperService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async getUserByEmail(email): Promise<IUser> {
    const user = await this.userRepo.findOne({
      relations: ['institution', 'roles'],
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
    };
  }

  async updateTourStatus(user: IUser) {
    if (!user) {
      return;
    }

    await this.userRepo.update(user.id, user);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepo.find({
      relations: ['institution', 'roles'],
    });
    if (!users) {
      return;
    }
    return users;
  }

  async register(data: IRegistrationParams): Promise<IResponse<IUser>> {
    let newOrUpdated: any = Object.assign({}, data);

    if (newOrUpdated.id) {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        return {
          status: false,
          message: 'User not found',
        };
      }

      // const institution = {
      //     type: user.institution.type,
      //     name: data.institution.name
      // }

      newOrUpdated.name = data.name;
      // newOrUpdated.institution = {...institution};

      await this.userRepo.save(newOrUpdated, { reload: true });

      return {
        status: true,
        message: 'User updated successfully',
        data: newOrUpdated,
      };
    }

    const isAnyParamEmpty: boolean =
      this.helperSvc.checkEmptyParams(newOrUpdated);
    if (isAnyParamEmpty) {
      return {
        status: false,
        message: 'Please fill form',
      };
    }

    const user = await this.getUserByEmail(newOrUpdated.email);

    if (user) {
      return {
        status: false,
        message: 'user already exist',
      };
    }

    let password = newOrUpdated.password;
    password = password.toString();

    const hashPassword = await argon.hash(password);
    newOrUpdated.password = hashPassword;

    await this.userRepo.save<User>(newOrUpdated);

    return {
      status: true,
      message: 'User registered successfully',
    };
  }

  async login(data: ILoginParams) {
    const user = await this.getUserByEmail(data.email);

    const validateUser = await this.vaildateUserByEmail({
      email: data.email,
      password: data.password
    });

    if (!validateUser) {
      return {
        status: false,
        message: 'wrong email or password',
      };
    }

    if (user.status !== this.userStatus.APPROVED) {
      return {
        status: false,
        message: 'user not approved',
      };
    }

    const payLoad: JwtPayload = {
      userId: user.id,
      email: user.email
    };

    return {
      access_token: this.generateAccessToken(payLoad),
      refresh_token: this.generateRefreshToken(payLoad),
      data: user,
      status: true,
      message: 'successfully logged in',
    };
  }

  generateAccessToken(payLoad: JwtPayload){
    return this.jwtService.sign(payLoad, {
      expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION,
      secret: this.config.get<string>('ACCESS_TOKEN_KEY'),
    });
  }

  generateRefreshToken(payLoad: JwtPayload){
    return this.jwtService.sign(payLoad, {
      expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION,
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }

  async changeRole(data: IUser, role: IRole) {
    let user = await this.getUserByEmail(data.email);

    // if(role) {
    //     user.role = role;
    // }

    await this.userRepo.update(user.id, user);
    return user;
  }

  async changeStatus(data: IUser, status: UserStatus) {
    let user = await this.getUserByEmail(data.email);

    if (status) {
      user.status = status;
    }

    await this.userRepo.update(user.id, user);
    return user;
  }

  async getCurrentUser(id): Promise<IUser> {
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: ['institution', 'roles'],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async vaildateUserByEmail(args: { email; password }) {
    const user = await this.getUserByEmail(args.email);
    if (!user) {
      return null;
    }

    const match = await argon.verify(user.password, args.password);

    if (!match) {
      return null;
    }

    return user;
  }

  async _sendMail(to, subject, template?, context?) {
    let result: {
      response;
      messageId;
      accepted: string[];
      rejected: string[];
      envelopeTime;
      messageTime;
    };
    try {
      result = await this.mailerService.sendMail({
        to: to, // list of receivers
        from: AppConstant.DEFAULT_EMAIL_USERNAME, // sender address
        subject: subject, // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      });
    } catch (e) {
      throw e;
    }

    return result;
  }
}
