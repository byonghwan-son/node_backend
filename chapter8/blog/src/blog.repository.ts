import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(post: PostDto): void;
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string): void;
  updatePost(post: PostDto, id: string): void;
}

export class BlogFileRepository implements BlogRepository {
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

  async updatePost(post: PostDto, id: string): Promise<void> {
    const posts = await this.getAllPost()
    const index = posts.findIndex((post) => post.id === id)
    posts[index] = { id, ...post, updatedDt: new Date() }
    await writeFile(this.FILE_NAME, JSON.stringify(posts))
  }

}