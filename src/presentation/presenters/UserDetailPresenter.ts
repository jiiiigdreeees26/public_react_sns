import { Post } from '../../domain/entities/Post';
import { User } from '../../domain/entities/User';
import { Following } from '../../domain/entities/Following';

export interface UserDetailViewModel {
  isFollowing: boolean;
  userPosts: Post[];
}

export class UserDetailPresenter {
  toViewModel(
    posts: Post[],
    followings: Following[],
    loginUser: User | undefined,
    displayUser: User,
  ): UserDetailViewModel {
    const isFollowing =
      followings.filter(
        (following) => following.followUserId === loginUser?.id && following.followedUserId === displayUser?.id,
      ).length > 0;
    const userPosts = posts.filter((post) => post.userId === displayUser?.id);
    return {
      isFollowing,
      userPosts
    };
  }
}