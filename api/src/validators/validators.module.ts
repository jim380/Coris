import { Module, HttpModule } from '@nestjs/common';
import { ValidatorsService } from './validators.service';
import { validatorsProviders } from './validators.providers';
import { DatabaseModule } from '../database/database.module';
import { ScheduleService } from '../schedule/schedule.service';

@Module({
  imports: [
    HttpModule,
    DatabaseModule
  ],
  providers: [
    ValidatorsService, 
    ScheduleService,
    ...validatorsProviders
  ],
})
export class ValidatorsModule {}
