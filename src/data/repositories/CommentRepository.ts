import { fetchComments, fetchCommentsByPostId, addComment } from '../../api/commentApi';
import { Comment } from '../../domain/entities/Comment';
import { AppDispatch } from '../../store/store';

export interface CommentRepository {
  fetchComments(): Promise<Comment[]>;
  fetchCommentsByPostId(postId: number): Promise<Comment[] | null>;
  addComment(comment: { content: string; postId: number; userId: number }, accessToken: string): Promise<Comment>;
}

export class CommentRepositoryImpl implements CommentRepository {
  constructor(
    private dispatch: AppDispatch
  ) {}

  async fetchComments(): Promise<Comment[]> {
    const result = await this.dispatch(fetchComments()).unwrap();
    return result;
  }

  async fetchCommentsByPostId(postId: number): Promise<Comment[] | null> {
    const result = await this.dispatch(fetchCommentsByPostId(postId)).unwrap();
    return result;
  }

  async addComment(comment: { content: string; postId: number ;userId: number }, accessToken: string): Promise<Comment> {
    const result = await this.dispatch(addComment({comment, accessToken})).unwrap();
    return result;
  }
}