import { HttpModule, HttpService, Module } from '@nestjs/common'
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
      load: [config],
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
