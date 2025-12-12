import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from '../domain/entities/User';
import { fetchUsers, fetchUserById, createUser, updateUserName, fetchUserByAuth0Sub } from '../api/userApi';

interface UsersState {
  users: User[];
  loginUserId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loginUserId: null,
  loading: false,
  error: null
};

export const setLoginUserId = createAction<number | null>('user/setLoginUserId');

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
      .addCase(fetchUserByAuth0Sub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByAuth0Sub.fulfilled, (state, action) => {
        state.loading = false;
        let isExist = false;
        if (action.payload) {
          state.users.forEach(user => {
            if (user.id === action.payload.id) {
              user.id = action.payload.id;
              user.name = action.payload.name;
              isExist = true;
              return;
            }
          });
          if (!isExist) {
            state.users.push(action.payload);
          }
        }
      })
      .addCase(fetchUserByAuth0Sub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'エラーが発生しました';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.loading = false;
        const user = state.users.find((p) => p.id === action.payload.id);
        if (user) user.name = action.payload.name;
      })
      .addCase(setLoginUserId, (state, action: PayloadAction<number | null>) => {
        state.loginUserId = action.payload;
      });
    },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
