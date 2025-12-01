import { Post } from '../../entities/Post';
import { PostRepository } from '../../../data/repositories/PostRepository';

export class FetchPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.fetchPosts();
  }
}