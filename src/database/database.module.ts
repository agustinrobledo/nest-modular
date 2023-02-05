import { Global, Module } from '@nestjs/common';

// This is an example of how we can inject values in our services
const API_KEY = '123456';

// Using Global we can have access of this module in all of our application
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
