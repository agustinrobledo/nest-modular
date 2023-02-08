import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import config from './config'

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey
    const dbName = this.configService.database.name
    return `apiKey: ${apiKey} dbName: ${dbName}`
  }
}
