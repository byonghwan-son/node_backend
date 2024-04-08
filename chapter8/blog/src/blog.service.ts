import { PostDto } from './blog.model';
import {BlogFileRepository, BlogMongoRepository} from './blog.repository';
import { Injectable } from '@nestjs/common';
import {Blog} from "./blog.mongoose";

// @Injectable()
// export class BlogService {
//   //posts: PostDto[] = []
//   //blogRepository: BlogRepository;
//
//   constructor(private blogRepository: BlogFileRepository) {}
//
//   async getAllPosts(): Promise<PostDto[]> {
//     return await this.blogRepository.getAllPost()
//   }
//
//   createPost(postDto : PostDto) : void {
//     this.blogRepository.createPost(postDto)
//   }
//
//   async getPost(id: string): Promise<PostDto> {
//     return await this.blogRepository.getPost(id);
//   }
//
//   delete(id: string): void {
//     this.blogRepository.deletePost(id);
//   }
//
//   updatePost(id: string, postDto: PostDto) : void {
//     this.blogRepository.updatePost(id, postDto)
//   }
// }

@Injectable()
export class BlogService {
  //posts: PostDto[] = []
  //blogRepository: BlogRepository;

  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts(): Promise<Blog[]> {
    return await this.blogRepository.getAllPost()
  }

  async createPost(blog: Blog): Promise<void> {
    await this.blogRepository.createPost(blog)
  }

  async getPost(id: string): Promise<Blog> {
    return await this.blogRepository.getPost(id);
  }

  async delete(id: string): Promise<void> {
    await this.blogRepository.deletePost(id);
  }

  async updatePost(id: string, postDto: Blog): Promise<void> {
    await this.blogRepository.updatePost(id, postDto)
  }
}