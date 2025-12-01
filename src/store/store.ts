import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import userReducer from './userSlice';
import followingReducer from './followingSlice';
import commentReducer from './commentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    following: followingReducer,
    comment: commentReducer,
  },
});

// 型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
