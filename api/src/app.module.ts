import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatorsService } from './validators/validators.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ValidatorsService],
})
export class AppModule {}
