import { Post } from '../../domain/entities/Post';
import { User } from '../../domain/entities/User';
import { Following } from '../../domain/entities/Following';
import { FilterFollowingPostsUseCase } from '../../domain/usecase/post/FilterFollowingPostsUseCase';

export interface PostListViewModel {
  displayPosts: Post[];
  userNameForPost: (post: Post) => string;
  titles: string[];
}

export class PostListPresenter {
  private filterFollowingPostsUseCase: FilterFollowingPostsUseCase;

  constructor() {
    this.filterFollowingPostsUseCase = new FilterFollowingPostsUseCase();
  }

  toViewModel(
    posts: Post[],
    users: User[],
    followings: Following[],
    loginUser: User | undefined,
    activeTab: number,
  ): PostListViewModel {
    const displayPosts =
      activeTab === 1
        ? posts
        : this.filterFollowingPostsUseCase.execute(posts, users, followings, loginUser);

    return {
      displayPosts,
      userNameForPost: (post: Post) => {
        return users.find((user) => user.id === post.userId)?.name || '';
      },
      titles: loginUser ? ['すべての投稿', 'フォロー中'] : ['すべての投稿'] 
    };
  }
}