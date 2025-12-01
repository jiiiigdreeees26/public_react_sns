import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Post } from '../domain/entities/Post';
import { addPost, fetchPostById, fetchPosts, likePost } from '../api/postApi';

// ステートの型
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// 初期状態
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'エラーが発生しました';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        const post = state.posts.find((p) => p.id === action.payload.id);
        if (post) post.likes += 1;
      });
  },
});

export default postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts;