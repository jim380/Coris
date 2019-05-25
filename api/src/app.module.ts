import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from 'nest-schedule';
import { ValidatorsModule } from './validators/validators.module';

@Module({
  imports: [
    HttpModule,
    ValidatorsModule,
    ScheduleModule.register(),
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
