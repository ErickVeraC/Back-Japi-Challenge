import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService],
})
export class AppModule {}
