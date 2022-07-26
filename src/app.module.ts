import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeormConfig } from './config/Typeorm.config';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useClass: TypeormConfig,
    }),
    HttpModule,
    UserModule,
    PostsModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
