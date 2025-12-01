import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import followingReducer from '../../store/followingSlice';
import commentReducer from '../../store/commentSlice';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { PostList } from '../../presentation/components/PostList/PostList';

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

describe('PostList コンポーネントのテスト', () => {
  test('投稿一覧が表示される', async () => {
    const session = {
      expires: '2026-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <PostList />,
      {},
      session,
    );

    await waitFor(() => {
      expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
      expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
      expect(screen.getByText(/testtesttest/i)).toBeInTheDocument();
    });

  });
  test('初期表示で「すべての投稿」ボタンがactiveの状態になっている', async () => {
    const session = {
      expires: '2026-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <PostList />,
      {},
      session,
    );

    await waitFor(() => {
      expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
      expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
      const allPostsButton = screen.getByRole('button', {name: 'すべての投稿'});
      expect(allPostsButton).toBeDefined();
      expect(allPostsButton).toHaveClass('border-blue-500');
    });
  });
  test('フォロー中ボタンを押下するとactiveの状態になっている', async () => {
    const session = {
      expires: '2026-03-30T05:06:48.876Z',
       user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <PostList />,
      {},
      session,
    );
    await waitFor(() => {
      expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
      expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
      const followingButton = screen.getByRole('button', {name: 'フォロー中'});
      expect(followingButton).toBeDefined();
      fireEvent.click(followingButton);
      expect(followingButton).toHaveClass('border-blue-500');
    });
  });  
  test('フォロー中ボタンを押下するとフォロー中のユーザーの投稿が表示される', async () => {
    const session = {
      expires: '2026-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <PostList />,
      {},
      session
    );
    await waitFor(() => {
      expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
      const followingButton = screen.getByRole('button', {name: 'フォロー中'});
      expect(followingButton).toBeDefined();
      fireEvent.click(followingButton);
      expect(screen.getAllByRole('link', { name: 'Test Post 1' })[0]).toBeDefined();
      // フォローしていないため存在しない
      expect(screen.queryByText(/testtesttest/i)).toBeNull();
    });
  });  
});
