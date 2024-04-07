import { PostDto } from './blog.model';
import { BlogFileRepository, BlogRepository } from './blog.repository';

export class BlogService {
  posts: PostDto[] = []
  // blogRepository: BlogRepository;

  constructor() {
    // this.blogRepository = new BlogFileRepository();
  }

  getAllPosts(): PostDto[] {
    return this.posts
  }

  createPost(postDto : PostDto) : void {
    const id : number = this.posts.length + 1;
    this.posts.push({
      id: id.toString(),
      ...postDto,
      createdDt: new Date()
    });
  }

  getPost(id) : PostDto {
    const post = this.posts.find((post) => post.id === id)
    console.log(post)
    return post
  }

  delete(id: string) : void {
    const filteredPosts = this.posts.filter((post) => post.id !== id)
    this.posts = [...filteredPosts]
  }

  updatePost(id: string, postDto: PostDto) : PostDto {
    let updatedIndex = this.posts.findIndex((post) => post.id === id)
    const updatePost : PostDto = {id, ...postDto, updatedDt: new Date()};
    this.posts[updatedIndex] = updatePost
    return updatePost
  }
}