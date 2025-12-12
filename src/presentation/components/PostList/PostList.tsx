import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { Grid, GridCellProps } from 'react-virtualized';
import { PostListPresenter } from '../../presenters/PostListPresenter';
import { PostRepositoryImpl } from '../../../data/repositories/PostRepository';
import { AppDispatch } from '../../../store/store';
import { selectUser, setLoginUserId } from '../../../store/userSlice';
import { FetchPostsUseCase } from '../../../domain/usecase/post/FetchPostsUseCase';
import { selectfollowing } from '../../../store/followingSlice';
import { selectPosts } from '../../../store/postsSlice';
import { PostElement } from './PostElement';
import { Tab } from './Tab';
import { FetchCommentsUseCase } from '../../../domain/usecase/comment/FetchCommentsUseCase';
import { CommentRepositoryImpl } from '../../../data/repositories/CommentRepository';
import { FollowingRepositoryImpl } from '../../../data/repositories/FollowingRepository';
import { FetchFollowingsUseCase } from '../../../domain/usecase/following/FetchFollowingsUseCase';
import { UserRepositoryImpl } from '../../../data/repositories/UserRepository';
import { FetchUsersUseCase } from '../../../domain/usecase/user/FetchUsersUseCase';
import { CreateUserUseCase } from '../../..//domain/usecase/user/CreateUserUseCase';
import { logger } from '../../../../lib/logger';
import { FetchUserByAuth0SubUseCase } from '../../../domain/usecase/user/FetchUserByAuth0SubUseCase';

export const PostList = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(selectPosts);
  const {users, loginUserId} = useSelector(selectUser);
  const followings = useSelector(selectfollowing).followings;
  const loginUser = users.find((user) => user.id === loginUserId);

  const [activeTab, setActiveTab] = useState(1);
  const [width, setWidth] = useState(1300);

  const postRepository = new PostRepositoryImpl(dispatch);
  const fetchPostsUseCase = new FetchPostsUseCase(postRepository);
  const commentRepository = new CommentRepositoryImpl(dispatch);
  const fetchCommentsUsecase = new FetchCommentsUseCase(commentRepository);
  const followRepository = new FollowingRepositoryImpl(dispatch);
  const fetchFollowingsUseCase = new FetchFollowingsUseCase(followRepository);
  const userRepository = new UserRepositoryImpl(dispatch);
  const fetchUsersUseCase = new FetchUsersUseCase(userRepository);
  const fetchUserByAuth0SubUseCase = new FetchUserByAuth0SubUseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);

  useEffect(() => {
    fetchPostsUseCase.execute().catch((err) => console.error(err));
    fetchCommentsUsecase.execute().catch((err) => console.error(err));
    fetchFollowingsUseCase.execute().catch((err) => console.error(err));
    fetchUsersUseCase.execute().catch((err) => console.error(err));
  }, [dispatch]);

  const handleUsers = async () => {
    try {
      if (session?.user) {
        const user = await fetchUserByAuth0SubUseCase.execute(session?.jwt?.accessToken || '');
        // userがnullなら新規登録する
        let finalUserId = 0;
        if (!user) {
          const newUser = await createUserUseCase.execute(
            session.user.name || '',
            session.user.email || '',
            session?.jwt?.sub || '',
            session?.jwt?.accessToken || '');
          logger.info({
            event: 'new_user_registration',
            user: session?.user?.name
          });
          finalUserId = newUser.id;
        }
        if (user) {
          finalUserId = user.id;
        }
        dispatch(setLoginUserId(finalUserId)); 
      }
    } catch(err) {
      console.error(err);
    }
  }
  useEffect(() => {
    handleUsers();
  }, [session]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // 動的に変化する値はviewModelで管理
  const presenter = new PostListPresenter();
  const viewModel = presenter.toViewModel(posts, users, followings, loginUser, activeTab);

  const cellRenderer = ({ columnIndex, key, rowIndex, style }: GridCellProps) => {
    const index = rowIndex === 0 ? columnIndex : columnIndex + rowIndex * 4;
    const post = viewModel.displayPosts[index];
    return (
      index < viewModel.displayPosts.length && (
        <div key={key} style={style}>
          <PostElement post={post} userName={viewModel.userNameForPost(post)} />
        </div>
      )
    );
  };

  return (
    <div>
      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        titles={viewModel.titles}
      />
      <div className="py-4">
        <Grid
          width={width - width / 7}
          columnWidth={width / 5}
          height={500}
          columnCount={4}
          rowCount={Math.ceil(viewModel.displayPosts.length / 4)}
          rowHeight={150}
          cellRenderer={cellRenderer}
        />
      </div>
    </div>
  );
};