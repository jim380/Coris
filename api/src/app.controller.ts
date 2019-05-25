import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidatorsService } from './validators/validators.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly validatorsService: ValidatorsService
  ) {}

  @Get()
  getHello() {
    // return this.validatorsService.initValidators();
  }
}
