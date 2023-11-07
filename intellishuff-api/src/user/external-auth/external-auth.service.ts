import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as moment from 'moment';

import { ExternalAuth } from './external-auth.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AppConstant } from 'src/universal/app.constant';

@Injectable()
export class ExternalAuthService {
  constructor(
    @InjectRepository(ExternalAuth)
    private externalAuthRepo: Repository<ExternalAuth>,
  ) {}

  findByEmail(email, externalIdentifier?, providerSystemName?) {
    if (!email) {
      return null;
    }

    const conditions: FindOptionsWhere<ExternalAuth> = { email: email };
    if (externalIdentifier) {
      conditions.externalIdentifier = externalIdentifier;
    }

    if (providerSystemName) {
      conditions.providerSystemName = providerSystemName;
    }

    return this.externalAuthRepo.find({ where: conditions });
  }

  async save(externalAuth: ExternalAuth) {
    let newOrUpdated: ExternalAuth;

    const existingAuth = <ExternalAuth>(
      (
        await this.findByEmail(
          externalAuth.email,
          externalAuth.externalIdentifier,
          externalAuth.providerSystemName,
        )
      )[0]
    );
    if (existingAuth) {
      newOrUpdated = Object.assign({}, existingAuth);
      if (!newOrUpdated.updatedOn) {
        newOrUpdated.updatedOn = <any>(
          moment().format(AppConstant.DEFAULT_DATETIME_FORMAT)
        );
      }
    } else {
      newOrUpdated = Object.assign({}, externalAuth);
    }

    if (!newOrUpdated.createdOn) {
      newOrUpdated.createdOn = <any>(
        moment().format(AppConstant.DEFAULT_DATETIME_FORMAT)
      );
    }

    //now save
    const newlyAddedOrUpdated = await this.externalAuthRepo.save<ExternalAuth>(
      newOrUpdated,
    );
    return newlyAddedOrUpdated;
  }
}
