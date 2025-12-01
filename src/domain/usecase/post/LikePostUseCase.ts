import { Post } from '../../entities/Post';
import { PostRepository } from '../../../data/repositories/PostRepository';

export class LikePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(postId: number): Promise<Post> {
    if (!postId) {
      throw new Error('Post ID is required');
    }
    return await this.postRepository.likePost(postId);
  }
}