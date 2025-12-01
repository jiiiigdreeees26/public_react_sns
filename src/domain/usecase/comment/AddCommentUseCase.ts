import { Comment } from '../../entities/Comment';
import { CommentRepository } from '../../../data/repositories/CommentRepository';

export class AddCommentUseCase {
  constructor(private postRepository: CommentRepository) {}

  async execute(content: string, postId: number ,userId: number, accessToken: string): Promise<Comment> {
    if (!content.trim()) {
      throw new Error('Content cannot be empty');
    }
    if (!postId) {
      throw new Error('Post ID is required');
    }
    if (!userId) {
      throw new Error('User ID is required');
    }
    return await this.postRepository.addComment({ content, postId, userId }, accessToken);
  }
}