import { Controller, Get } from '@nestjs/common';
import { AppConstant } from 'src/universal/app.constant';

@Controller(`${AppConstant.ROUTE_PREFIX}/quiz`)
export class QuizController {
  @Get('get')
  get() {
    return 'hello';
  }
}
