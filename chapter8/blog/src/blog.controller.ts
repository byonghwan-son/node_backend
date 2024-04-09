import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PostDto } from './blog.model';
import {Blog} from "./blog.mongoose";

@Controller('blog')
export class BlogController {
  // blogService: BlogService

  constructor(private blogService: BlogService) {}

  @Get()
  getAllPosts() : Promise<any[]> {
    console.log('모든 게시글 가져오기')
    return this.blogService.getAllPosts();
  }

  @Post()
  async createPost(@Body() post: any): Promise<string> {
    console.log('게시글 작성')

    await this.blogService.createPost(post);
    return "success"
  }

  @Get('/:id')
  async getPost(@Param('id') id: string): Promise<any> {
    console.log(`[id: ${id}] 게시글 하나 가져오기`)
    return await this.blogService.getPost(id)
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) : string {
    console.log('게시글 삭제')
    this.blogService.delete(id)
    return "success"
  }

  @Put('/:id')
  async updatePost(@Param('id') id: string, @Body() post: any) {
    console.log(`[${id}] 게시글 업데이트`)
    await this.blogService.updatePost(id, post);
    console.log(post)
  }

}