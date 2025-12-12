import { Post } from '../../domain/entities/Post';
import { User } from '../../domain/entities/User';
import { Following } from '../../domain/entities/Following';

export interface ProfileViewModel {
  loginUserfollowingUsers: User[];
  loginUserFollowers: User[];
  userPosts: Post[];
}

export class ProfilePresenter {
  toViewModel(
    posts: Post[],
    users: User[],
    followings: Following[],
    loginUserId: number | undefined,
  ): ProfileViewModel {
    const loginUserfollowingUsers = users.filter((user) =>
      followings.filter(
        (following) => following.followUserId === loginUserId
      ).some(v => v.followedUserId === user.id));

    const loginUserFollowers = users.filter((user) => 
      followings.filter(
        (following) => following.followedUserId === loginUserId
      ).some(v => v.followUserId === user.id));

    const userPosts = posts.filter((post) => post.userId === loginUserId);
    return {
      loginUserfollowingUsers,
      loginUserFollowers,
      userPosts
    };
  }
}