import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../store/postsSlice';
import userReducer from '../../store/userSlice';
import followingReducer from '../../store/followingSlice';
import commentReducer from '../../store/commentSlice';
import { ReactNode, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Tab } from '../..//presentation/components/PostList/Tab';

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

describe('Tab コンポーネントのテスト', () => {
  test('設定したタブのタイトルが表示される', () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    const props = {
      activeTab: 1,
      setActiveTab: vitest.fn(),
      titles: ['すべての投稿', 'フォロー中']
    }
    renderWithProviders(
      <Tab {...props} />,
      {},
      session,
    );

    expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
  });
  test('初期表示で「すべての投稿」ボタンがactiveの状態になっている', async () => {
    const session = {
      expires: '2025-03-30T05:06:48.876Z',
      user: { name: 'eiki', email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1, image: '' },
    };
    const props = {
      activeTab: 1,
      setActiveTab: vitest.fn(),
      titles: ['すべての投稿', 'フォロー中']
    }
    renderWithProviders(
      <Tab {...props} />,
      {},
      session,
    );

    expect(screen.getByText(/すべての投稿/i)).toBeInTheDocument();
    expect(screen.getByText(/フォロー中/i)).toBeInTheDocument();
    const allPostsButton = screen.getByRole('button', {name: 'すべての投稿'});
    expect(allPostsButton).toBeDefined();
    expect(allPostsButton).toHaveClass('border-blue-500');
  });
});
