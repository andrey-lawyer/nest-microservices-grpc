import { Controller, Get } from '@nestjs/common';
import { DbService } from './db.service';

@Controller()
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  getHello(): string {
    return this.dbService.getHello();
  }
}
