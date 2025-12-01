import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Following } from '../domain/entities/Following';
import { addFollowing, deleteFollowing, fetchFollowingByUserId, fetchFollowings } from '../api/followingApi';

interface followingState {
  followings: Following[];
  loading: boolean;
  error: string | null;
}

const initialState: followingState = {
  followings: [],
  loading: false,
  error: null
};

export const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowings.fulfilled, (state, action) => {
        state.loading = false;
        state.followings = action.payload;
      })
      .addCase(fetchFollowingByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.followings = action.payload;
      })
      .addCase(addFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.followings.push(action.payload);
      })
      .addCase(deleteFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.followings = state.followings.filter((p) => p.id !== action.payload.id);
      });
  },
});

export default followingSlice.reducer;
export const selectfollowing = (state: RootState) => state.following;
