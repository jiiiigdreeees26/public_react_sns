import { fetchPosts, fetchPostById, addPost, likePost } from '../../api/postApi';
import { Post } from '../../domain/entities/Post';
import { AppDispatch } from '../../store/store';

export interface PostRepository {
  fetchPosts(): Promise<Post[]>;
  fetchPostById(postId: number): Promise<Post | null>;
  addPost(post: { content: string; userId: number;}, accessToken: string): Promise<Post>;
  likePost(postId: number): Promise<Post>;
}

export class PostRepositoryImpl implements PostRepository {
  constructor(
    private dispatch: AppDispatch
  ) {}

  async fetchPosts(): Promise<Post[]> {
    const result = await this.dispatch(fetchPosts()).unwrap();
    return result;
  }

  async fetchPostById(postId: number): Promise<Post | null> {
    const result = await this.dispatch(fetchPostById(postId)).unwrap();
    return result;
  }

  async addPost(post: { content: string; userId: number;}, accessToken: string): Promise<Post> {
    const result = await this.dispatch(addPost({post, accessToken})).unwrap();
    return result;
  }

  async likePost(postId: number): Promise<Post> {
    const result = await this.dispatch(likePost(postId)).unwrap();
    return result;
  }
}