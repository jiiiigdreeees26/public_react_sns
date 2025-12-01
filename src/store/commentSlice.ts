import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Comment } from '../domain/entities/Comment';
import { fetchComments, fetchCommentsByPostId, addComment } from '../api/commentApi';

interface commentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: commentState = {
  comments: [],
  loading: false,
  error: null
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchComments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = action.payload;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'エラーが発生しました';
        })
        .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = action.payload;
        })
        .addCase(fetchCommentsByPostId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'エラーが発生しました';
        })
        .addCase(addComment.fulfilled, (state, action) => {
          state.loading = false;
          state.comments.push(action.payload);
        });
    },
});

export default commentSlice.reducer;
export const selectComment = (state: RootState) => state.comment;
