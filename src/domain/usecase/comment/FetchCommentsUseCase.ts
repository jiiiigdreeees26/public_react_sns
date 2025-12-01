import { Comment } from '../../entities/Comment';
import { CommentRepository } from '../../../data/repositories/CommentRepository';

export class FetchCommentsUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(): Promise<Comment[]> {
    return this.commentRepository.fetchComments();
  }
}