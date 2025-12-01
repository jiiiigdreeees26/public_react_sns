import { CommentRepository } from "../../../data/repositories/CommentRepository";
import { Comment } from "../../entities/Comment";

export class FetchCommentsByPostIdUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(postId: number): Promise<Comment[] | null> {
    if (!postId) throw new Error('Post ID is required');
    return await this.commentRepository.fetchCommentsByPostId(postId);
  }
}