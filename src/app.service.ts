import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    private config: ConfigService,
  ) {}
  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    const dbName = this.config.get('DATABASE_NAME');
    return `apiKey: ${apiKey} dbName: ${dbName}`;
  }
}
