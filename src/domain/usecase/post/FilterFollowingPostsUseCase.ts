import { Post } from '../../entities/Post';
import { User } from '../../entities/User';
import { Following } from '../../entities/Following';

export class FilterFollowingPostsUseCase {
  execute(
    posts: Post[],
    users: User[],
    followings: Following[],
    loginUser: User | undefined,
  ): Post[] {
    if (!loginUser) return posts;

    const loginUserFollowings = followings
      .filter((f) => f.followUserId === loginUser.id)
      .map((f) => f.followedUserId);

    const followingUsersIds = users
      .filter((user) => loginUserFollowings.includes(user.id))
      .map((user) => user.id);

    return posts.filter(
      (post) =>
        followingUsersIds.includes(post.userId) || post.userId === loginUser.id,
    );
  }
}