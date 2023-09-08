import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { SeedDataMiddleware } from './universal/middleware/seed-data.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppConstant } from './universal/app.constant';
import { InstitutionModule } from './institution/institution.module';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { UserStatus } from './user/user.model';
import { InstitutionType } from './institution/institution.model';
import { QuizModule } from './quiz/quiz.module';
import { RoleModule } from './role/role/role.module';
import { RoleService } from './role/role/role.service';

const CONNECTION_NAME = 'default';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
      cache: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: AppConstant.DEFAULT_EMAIL_SMTP,
        port: 587,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: AppConstant.DEFAULT_EMAIL_USERNAME,
          pass: AppConstant.DEFAULT_EMAIL_PASSWORD,
        },
      },
      preview: true,

      // defaults: {
      //   from: ' "No Reply" <noreply@SmartEagles.com>',
      // },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: CONNECTION_NAME,
      // database: `./_db/amanah.db`,
      // entities: [Trip],
      // synchronize: true,
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    InstitutionModule,
    QuestionModule,
    SubjectModule,
    QuizModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /**
   *
   */
  constructor(private userSvc: UserService) {}

  async configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV == 'production') {
      let SuperAdmin = await this.userSvc.getUserByEmail(
        'dev.faisalK@gmail.com',
      );
      console.log('prod');

      if (!SuperAdmin) {
        await this.userSvc.register({
          email: 'dev.faisalK@gmail.com',
          name: 'faisal khan',
          password: '</>Intellishuff256',
          roles: ['Admin'], // Pass an array of role names
          status: UserStatus.APPROVED,
          tourVisited: true,
          institution: {
            type: InstitutionType.COLLEGE,
            name: 'Peshwar Model College',
          },
        });

        return;
      }
    }

    console.log('development');
    consumer.apply(SeedDataMiddleware).forRoutes('/');
  }
}
