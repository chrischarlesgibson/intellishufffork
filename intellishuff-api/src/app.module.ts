import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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

const CONNECTION_NAME = "default";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
      cache: true
    }),
    MailerModule.forRoot({
      transport: {
        host: AppConstant.DEFAULT_EMAIL_SMTP,
        port: 465,
        secure: false,
        auth: {
          user: AppConstant.DEFAULT_EMAIL_USERNAME,
          pass: AppConstant.DEFAULT_EMAIL_PASSWORD,
        },
      },
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
        database: './_db/intellishuff.db',  
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    UserModule,
    InstitutionModule,
    QuestionModule,
    SubjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer ) {
    if(!process.env.SEED_DATA) {
      console.log('not set')
      return;
    }
    consumer.apply(SeedDataMiddleware).forRoutes('/');
  }

}
