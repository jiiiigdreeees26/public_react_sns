import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from '../domain/entities/User';
import { fetchUsers, fetchUserById, createUser, updateUserName } from '../api/userApi';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'エラーが発生しました';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      }).addCase(updateUserName.fulfilled, (state, action) => {
        state.loading = false;
        const user = state.users.find((p) => p.id === action.payload.id);
        if (user) user.name = action.payload.name;
      });
    },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
