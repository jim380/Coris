import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateValidatorDto } from './dto/create-validator.dto';
import { ValidatorsService } from './validators.service';
import { Validator } from './interfaces/validator.interface';

@Controller('validators')
export class ValidatorsController {
  constructor(private readonly validatorsService: ValidatorsService) {}

  // @aakatev
  // Hookup later when dev-node has https/cors
  @Get()
  async findAll(): Promise<Validator[]> {
    return this.validatorsService.findAll();
  }
}
