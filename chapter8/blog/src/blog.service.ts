import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  //posts: PostDto[] = []
  //blogRepository: BlogRepository;

  constructor(private blogRepository: BlogFileRepository) {}

  async getAllPosts(): Promise<PostDto[]> {
    return await this.blogRepository.getAllPost()
  }

  createPost(postDto : PostDto) : void {
    this.blogRepository.createPost(postDto)
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  delete(id: string): void {
    this.blogRepository.deletePost(id);
  }

  updatePost(id: string, postDto: PostDto) : void {
    this.blogRepository.updatePost(id, postDto)
  }
}