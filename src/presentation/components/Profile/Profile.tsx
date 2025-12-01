import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { selectfollowing } from '../../../store/followingSlice';
import { selectPosts } from '../../../store/postsSlice';
import { selectUser } from '../../../store/userSlice';
import { PostForm } from '../PostForm/PostForm';
import { PostElement } from '../PostList/PostElement';
import { Tab } from '../PostList/Tab';
import { ProfilePresenter } from '../../presenters/ProfilePresenter';
import { CommentRepositoryImpl } from '../../../data/repositories/CommentRepository';
import { FollowingRepositoryImpl } from '../../../data/repositories/FollowingRepository';
import { PostRepositoryImpl } from '../../../data/repositories/PostRepository';
import { FetchCommentsUseCase } from '../../../domain/usecase/comment/FetchCommentsUseCase';
import { FetchFollowingByUserIdUseCase } from '../../../domain/usecase/following/FetchFollowingByUserIdUseCase';
import { FetchPostsUseCase } from '../../../domain/usecase/post/FetchPostsUseCase';
import { AppDispatch } from '../../../store/store';
import { UserRepositoryImpl } from '../../../data/repositories/UserRepository';
import { FetchUsersUseCase } from '../../../domain/usecase/user/FetchUsersUseCase';

export const Profile = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];
  const { posts, loading, error } = useSelector(selectPosts);
  const users = useSelector(selectUser).users;
  const followings = useSelector(selectfollowing).followings;
  // タブ切り替え
  const [activeTab, setActiveTab] = useState(1);
  
  const FollowingRepository = new FollowingRepositoryImpl(dispatch);
  const fetchFollowingByUserIdUseCase = new FetchFollowingByUserIdUseCase(FollowingRepository);

  const PostRepository = new PostRepositoryImpl(dispatch);
  const fetchPostsUseCase = new FetchPostsUseCase(PostRepository);

  const commentRepository = new CommentRepositoryImpl(dispatch);
  const fetchCommentsUsecase = new FetchCommentsUseCase(commentRepository);

  const userRepositoryImpl = new UserRepositoryImpl(dispatch);;
  const fetchUsersUseCase = new FetchUsersUseCase(userRepositoryImpl);

  const presenter = new ProfilePresenter();
  const viewModel = presenter.toViewModel(posts, users,followings, loginUser);

  useEffect(() => {
    fetchFollowingByUserIdUseCase.execute(loginUser?.id || 0).catch((err) => console.error(err));
    fetchPostsUseCase.execute().catch((err) => console.error(err));
    fetchCommentsUsecase.execute().catch((err) => console.error(err));
  }, [loginUser]);

  useEffect(() => {
    if (session?.expires) {
      fetchUsersUseCase.execute().catch((err) => console.error(err));
    }
  }, [session]);
  if (!session) return <p>サインインが必要です。</p>;


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    session && (
      <div>
        <img src={String(session.user?.image)} alt={String(loginUser?.name)} />
        <div>
          {loginUser?.name}'s Profile
          <Link href="/setting" className="hover:underline">
            &nbsp;⚙
          </Link>
        </div>
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} titles={['投稿', 'フォロー中', 'フォロワー']} />
        {activeTab === 1 && viewModel.userPosts.length > 0 && (
          <h2 className="py-2">Posts by {loginUser?.name}</h2>
        )}
        {activeTab === 1 &&
          <div className="py-4 grid grid-cols-4 gap-4">
            {viewModel.userPosts.map((post, i) => (
              <div key={i}>
                <PostElement post={post} />
              </div>
            ))}
          </div>  
        }
        {activeTab === 1 && <PostForm />}
        {activeTab === 2 &&
          viewModel.loginUserfollowingUsers.map((user) => (
            <div className="py-2 px-6">
              <Link
                href={{
                  pathname: '/user/detail/[userId]',
                  query: { userId: user.id },
                }}
                className="hover:underline"
              >
                {user.name}
              </Link>
              {viewModel.loginUserFollowers.some(v => v === user) ? <span className="text-gray-500"> フォローされています</span> : ''}
            </div>
          ))}
        {activeTab === 3 &&
          viewModel.loginUserFollowers.map((user) => (
            <div className="py-2 px-6">
              <Link
                href={{
                  pathname: '/user/detail/[userId]',
                  query: { userId: user.id },
                }}
                className="hover:underline"
              >
                {user.name}
              </Link>
              {viewModel.loginUserfollowingUsers.some(v => v === user) ? <span className="text-gray-500"> フォローしています</span> : ''}
            </div>
          ))}
      </div>
    )
  );
}
