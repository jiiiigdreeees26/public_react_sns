import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectfollowing } from "../../../store/followingSlice";
import { selectPosts } from "../../../store/postsSlice";
import { selectUser } from "../../../store/userSlice";
import { PostElement } from "../PostList/PostElement";
import { FollowingRepositoryImpl } from "../../../data/repositories/FollowingRepository";
import { AddFollowingUseCase } from "../../../domain/usecase/following/AddFollowingUseCase";
import { DeleteFollowingUseCase } from "../../../domain/usecase/following/DeleteFollowingUseCase";
import { FetchFollowingByUserIdUseCase } from "../../../domain/usecase/following/FetchFollowingByUserIdUseCase";
import { useEffect } from "react";
import { PostRepositoryImpl } from "../../../data/repositories/PostRepository";
import { FetchPostsUseCase } from "../../../domain/usecase/post/FetchPostsUseCase";
import { UserDetailPresenter } from "../../presenters/UserDetailPresenter";
import { CommentRepositoryImpl } from "../../../data/repositories/CommentRepository";
import { FetchCommentsUseCase } from "../../../domain/usecase/comment/FetchCommentsUseCase";

export const UserDetail = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(selectPosts);
  const followings = useSelector(selectfollowing).followings;
  const displayUser = useSelector(selectUser).users.filter(
    (v) => v.id === Number(pathname?.replace(/\/user\/detail\//, '')),
  )[0];

  const FollowingRepository = new FollowingRepositoryImpl(dispatch);
  const fetchFollowingByUserIdUseCase = new FetchFollowingByUserIdUseCase(FollowingRepository);
  const addFollowingUseCase = new AddFollowingUseCase(FollowingRepository);
  const deleteFollowingUseCase = new DeleteFollowingUseCase(FollowingRepository);

  const PostRepository = new PostRepositoryImpl(dispatch);
  const fetchPostsUseCase = new FetchPostsUseCase(PostRepository);

  const commentRepository = new CommentRepositoryImpl(dispatch);
  const fetchCommentsUsecase = new FetchCommentsUseCase(commentRepository);

  const presenter = new UserDetailPresenter();
  const viewModel = presenter.toViewModel(posts, followings, loginUser, displayUser);


  const handleFollow = () => {
    if (!loginUser) return;
    if (viewModel.isFollowing) {
      deleteFollowingUseCase.execute(
        followings
          .filter(
            following => following.followUserId === loginUser.id && following.followedUserId === displayUser.id
          )[0].id,
        (session as any)?.jwt?.accessToken);
    } else {
      addFollowingUseCase.execute(loginUser.id, displayUser.id, (session as any)?.jwt?.accessToken).catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchFollowingByUserIdUseCase.execute(displayUser?.id || 0).catch((err) => console.error(err));
    fetchPostsUseCase.execute().catch((err) => console.error(err));
    fetchCommentsUsecase.execute().catch((err) => console.error(err));
  }, [displayUser]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!session) return <p>サインインが必要です。</p>;

  return (
    session && (
      <div>
        <img
          src={String(session.user?.image)}
          alt={String(displayUser?.name)}
        />
        <div>{displayUser?.name}'s Profile</div>
        {displayUser?.id !== loginUser?.id &&
          <button
            className={
              'px-4 py-2 text-white rounded-lg' +
              (viewModel.isFollowing
                ? ' bg-red-500 hover:bg-red-600'
                : ' bg-blue-500 hover:bg-blue-600')
            }
            onClick={handleFollow}
          >
            {viewModel.isFollowing ? 'Unfollow' : 'Follow'}
          </button>}
        {viewModel.userPosts.length > 0 && <h2>Posts by {displayUser?.name}</h2>}
        {viewModel.userPosts.map((post, i) => (
          <div key={i}>
            <PostElement post={post} />
          </div>
        ))}
      </div>
    )
  );
}