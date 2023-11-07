import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/user/user.model';

@Injectable()
export class SubjectService {
  /**
   *
   */
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) {}

  async findById(args) {
    if (!args) {
      return;
    }

    return await this.subjectRepo.findOne(args.id);
  }

  async addSubject(args): Promise<IResponse<any>> {
    if (!args) {
      return;
    }

    const subjectExist = await this.subjectRepo.findOne({
      where: { name: args.name },
    });
    if (subjectExist) {
      return {
        message: 'Subject already Exist',
        status: false,
      };
    }

    await this.subjectRepo.save<Subject>(args);
    return {
      message: `successfully added ${args.name} as subject`,
      status: true,
    };
  }

  async getAllSubjects() {
    const subs = await this.subjectRepo.find();

    if (!subs) {
      return null;
    }

    return subs;
  }

  async getFirstSub() {
    const sub = await this.subjectRepo.find();

    if (!sub) {
      return null;
    }

    return sub;
  }

  async deleteSubject(subject): Promise<IResponse<any>> {
    if (!subject) {
      return {
        status: false,
      };
    }

    const isSubjectAvailabel = await this.subjectRepo.findOne(subject);
    if (!isSubjectAvailabel) {
      throw new NotFoundException('Cat not found');
    }

    await this.subjectRepo.delete(subject.id);

    return {
      status: true,
    };
  }

  async updateSubject(subject): Promise<IResponse<any>> {
    if (!subject || !subject.name) {
      return {
        status: false,
        message: 'Error',
      };
    }

    await this.subjectRepo.save(subject, { reload: true });

    return {
      status: true,
      message: 'Subject updated',
    };
  }
}
