import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Database } from './database/database.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [Database],
})
export class AppModule {}
