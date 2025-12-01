import { Post } from '../../entities/Post';
import { PostRepository } from '../../../data/repositories/PostRepository';

export class AddPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(content: string, userId: number | undefined, accessToken: string): Promise<Post> {
    if (!content.trim()) {
      throw new Error('Content cannot be empty');
    }
    if (!userId) {
      throw new Error('User ID is required');
    }
    return await this.postRepository.addPost({ content, userId }, accessToken);
  }
}