import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import followingReducer from '../../store/followingSlice';
import commentReducer from '../../store/commentSlice';
import { ReactNode } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { CommentElement } from '../../presentation/components/PostList/CommentElement';

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

describe('CommentElement コンポーネントのテスト', () => {
  test('コメントが表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    const props = {
      postId: 5001,
      isCommentDisp: true
    }
    renderWithProviders(
      <CommentElement {...props} />,
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
          ]
        },
        comment: {
          comments: [
            {
              id: 1,
              content: 'コメントです',
              postId: 5001,
              userId: 501
            }
          ]
        }
      },
      session,
    );

    expect(screen.getByText(/コメントです/i)).toBeInTheDocument();
  });
  test('コメントの件数が表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <CommentElement postId={5001} />,
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
          ]
        },
        comment: {
          comments: [
            {
              id: 1,
              content: 'コメントです',
              postId: 5001,
              userId: 501
            }
          ]
        }
      },
      session,
    );

    expect(screen.getByText(/コメント件数\[1\]/i)).toBeInTheDocument();
  });
});
