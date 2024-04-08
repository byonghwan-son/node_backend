import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {BlogFileRepository, BlogMongoRepository} from './blog.repository';
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./blog.mongoose";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/blog?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000'
    ),
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      }
    ])
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}
