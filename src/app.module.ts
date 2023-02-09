import { HttpModule, HttpService, Module } from '@nestjs/common'
import * as Joi from 'joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { environments } from './environments'
import config from './config'

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      // Load config for use in our app.service
      load: [config],
      // Validation for environment variables if one doesn't exist our app throws an error
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // This is an example of how we can use the HttpModule, HttpService and useFactory
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/posts')
          .toPromise()
        return tasks.data
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
