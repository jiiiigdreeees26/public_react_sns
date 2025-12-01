import { Post } from "../../domain/entities/Post";
import { User } from "../../domain/entities/User";

export interface PostDetailViewModel {
  post: Post | null;
  userName: string;
  isCommentDisplayed: boolean;
}

export class PostDetailPresenter {
  toViewModel(post: Post | null, users: User[]): PostDetailViewModel {
    return {
      post,
      userName: post ? users.find((user) => user.id === post.userId)?.name || '' : '',
      isCommentDisplayed: true,
    };
  }
}