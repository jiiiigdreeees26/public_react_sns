import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import followingReducer from '../../store/followingSlice';
import commentReducer from '../../store/commentSlice';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { AuthButton } from '../AuthButton';

// ユーティリティ関数：モックストアの作成
const renderWithProviders = (
  ui: ReactNode,
  preloadedState = {},
  session: Session | null,
) => {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
      user: userReducer,
      following: followingReducer,
      comment: commentReducer
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <SessionProvider session={session}>{ui}</SessionProvider>
    </Provider>,
  );
};

describe('AuthButtonコンポーネントのテスト', () => {
  test('サインイン状態のAuthButtonが表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki2', email: 'test@test.com', image: '' },
    };
    renderWithProviders(
      <AuthButton />,
      {
        user: {
          users: [
            {
              id: 501,
              name: 'eiki',
              email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1 || '',
            },
            {
              id: 502,
              name: 'iimura',
              email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL2 || '',
            },
            {
              id: 503,
              name: 'eiki2',
              email: 'test@test.com',
            }
          ]
        },
        posts: {
          posts: [
            { id: 5001, content: '初めての投稿！', likes: 3, userId: 503 },
            { id: 5002, content: 'Redux Toolkit のテスト投稿', likes: 7, userId: 503 },
            { id: 5003, content: 'Go の API も作る予定', likes: 5, userId: 503 },
            { id: 5004, content: '初めての投稿！', likes: 3, userId: 502 },
            { id: 5005, content: 'Redux Toolkit のテスト投稿', likes: 7, userId: 502 },
            { id: 5006, content: 'Go の API も作る予定', likes: 5, userId: 502 },
          ],
          loading: false,
          error: null,
        },
        following: {
          followings: [
            {
              id: 1,
              followUserId: 503,
              followedUserId: 502,
            },
            {
              id: 2,
              followUserId: 503,
              followedUserId: 501,
            },
        ]},
        comment: {comments: []}
      },
      session,
    );
    
    expect(screen.getByText(/ようこそ、eiki2さん/i)).toBeInTheDocument();
    expect(screen.getByText(/サインアウト/i)).toBeInTheDocument();
  });
  test('サインアウト状態のAuthButtonが表示される', () => {
    const session = null;
    renderWithProviders(
      <AuthButton />,
      {},
      session,
    );
    expect(screen.getByText(/サインイン/i)).toBeInTheDocument();
  });
});
