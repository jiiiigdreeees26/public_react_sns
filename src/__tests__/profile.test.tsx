import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../store/postsSlice';
import userReducer from '../store/userSlice';
import followingReducer from '../store/followingSlice';
import commentReducer from '../store/commentSlice';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Profile from '../pages/profile';

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

describe('Profileコンポーネントのテスト', () => {
  test('プロフィールが表示される', async() => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    renderWithProviders(
      <Profile />,
      {},
      session,
    );
    
    await waitFor(() => {
      expect(screen.getByText(/^投稿$/i)).toBeInTheDocument();
      expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
      expect(screen.getByText(/フォロワー/i)).toBeInTheDocument();
      expect(screen.getByText(/eiki's Profile/i)).toBeInTheDocument();
      expect(screen.getAllByRole('link', { name: '投稿してます'})[0]).toBeDefined();
      expect(screen.getByText(/投稿する/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/何を考えていますか？/i),
      ).toBeInTheDocument();
    });
  });
  test('プロフィールが表示されない(未ログイン)', async() => {
    renderWithProviders(
      <Profile />,
      {},
      null,
    );
    
    await waitFor(() => {
      expect(screen.queryByText(/^投稿$/i)).toBeNull();
      expect(screen.queryByText(/フォロー中/i)).toBeNull();
      expect(screen.queryByText(/フォロワー/i)).toBeNull();
      expect(screen.queryByText(/eiki's Profile/i)).toBeNull();
      expect(screen.queryByText(/投稿してます/i)).toBeNull();
      expect(screen.queryByText(/投稿する/i)).toBeNull();
      expect(
        screen.queryByText(/何を考えていますか？/i),
      ).toBeNull();
      expect(screen.getByText(/サインインが必要です。/i)).toBeInTheDocument();
    });
  });
});
