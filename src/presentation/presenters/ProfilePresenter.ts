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
    loginUser: User | undefined,
  ): ProfileViewModel {
    const loginUserfollowingUsers = users.filter((user) =>
      followings.filter(
        (following) => following.followUserId === loginUser?.id
      ).some(v => v.followedUserId === user.id));

    const loginUserFollowers = users.filter((user) => 
      followings.filter(
        (following) => following.followedUserId === loginUser?.id
      ).some(v => v.followUserId === user.id));

    const userPosts = posts.filter((post) => post.userId === loginUser?.id);
    return {
      loginUserfollowingUsers,
      loginUserFollowers,
      userPosts
    };
  }
}