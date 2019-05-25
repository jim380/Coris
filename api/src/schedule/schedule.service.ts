import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { ValidatorsService } from '../validators/validators.service';
import { cronInterval } from '../config/config'

@Injectable()
export class ScheduleService extends NestSchedule {    
  constructor(
    @Inject(forwardRef(() => ValidatorsService))
    private readonly validatorsService: ValidatorsService,
  ) {
    super();
    console.log("SCHEDULER STARTED!");
  }

  @Cron(cronInterval)
  async cronJob() {
    this.validatorsService.initValidators();
  }

}