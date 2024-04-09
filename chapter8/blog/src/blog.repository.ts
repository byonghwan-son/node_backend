import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
import { Model, Promise } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.mongoose';

export interface BlogRepository<T> {
  getAllPost(): Promise<T[]>;
  createPost(post: T): void;
  getPost(id: string): Promise<T>;
  deletePost(id: string): void;
  updatePost(id: string, post: T): void;
}

@Injectable()
export class BlogFileRepository implements BlogRepository<PostDto> {
  FILE_NAME = './src/blog.data.json'

  async createPost(post: PostDto): Promise<void> {
    const posts = await this.getAllPost()
    const id = posts.length + 1
    const createPost = {
      id: id.toString(),
      ...post,
      createdDt: new Date()
    }
    posts.push(createPost)
    await writeFile(this.FILE_NAME, JSON.stringify(posts))
  }

  async deletePost(id: string): Promise<void> {
    const posts = await this.getAllPost()
    const result = posts.filter(post => post.id !== id)
    await writeFile(this.FILE_NAME, JSON.stringify(result))
  }

  async getAllPost(): Promise<PostDto[]> {
    const datas = await readFile('./src/blog.data.json', 'utf8')
    return JSON.parse(datas)
  }

  async getPost(id: string): Promise<PostDto> {
    const posts = await this.getAllPost()
    return posts.find((post) => post.id === id)
  }

  async updatePost(id: string, post: PostDto): Promise<void> {
    const posts = await this.getAllPost()
    const index = posts.findIndex((post) => post.id === id)
    posts[index] = { id, ...post, updatedDt: new Date() }
    await writeFile(this.FILE_NAME, JSON.stringify(posts))
  }

}

@Injectable()
export class BlogMongoRepository implements BlogRepository<Blog> {

  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

  async createPost(post: Blog): Promise<void> {
    const createPost = {
      ...post,
      createdDt: new Date()
    }
    await this.blogModel.create(createPost)
  }

  async deletePost(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id);
  }

  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec()
  }

  async getPost(id: string): Promise<Blog> {
    return this.blogModel.findById(id);
  }

  async updatePost(id: string, post: Blog): Promise<void> {
    const updatePost = { ...post, updatedDt: new Date() }
    await this.blogModel.findByIdAndUpdate(id, updatePost)
  }



}