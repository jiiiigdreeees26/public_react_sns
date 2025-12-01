import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../domain/entities/User";

interface createUserArgs {
  name: string;
  email: string;
  accessToken: string;
}
export const createUser = createAsyncThunk(
  'users/createUser',
  async (createUserArgs: createUserArgs) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  (createUserArgs.accessToken || '')
      },
      body: JSON.stringify({
        name: createUserArgs.name,
        email: createUserArgs.email
      }),
    });

    if (!response.ok) throw new Error('ユーザーの追加に失敗しました');

    return (await response.json()) as User;
  },
);

interface updateUserNameArgs {
  id: number;
  name: string;
  email: string
  accessToken: string
}
export const updateUserName = createAsyncThunk(
  'users/updateUserName',
  async (updateUserNameArgs: updateUserNameArgs) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/users/' + updateUserNameArgs.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  (updateUserNameArgs.accessToken || '')
      },
      body: JSON.stringify({
        id: updateUserNameArgs.id,
        name: updateUserNameArgs.name,
        email: updateUserNameArgs.email
      }),
    });

    if (!response.ok) throw new Error('ユーザーの更新に失敗しました');

    return (await response.json()) as User;
  },
);

// 非同期のユーザーデータ取得処理
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/users');
  if (!response.ok) throw new Error('ユーザーの取得に失敗しました');
  return (await response.json()) as User[];
});

interface fetchUserByIdArgs {
  userId: number;
}
export const fetchUserById= createAsyncThunk('users/fetchUserById', async (fetchUserByIdArgs: fetchUserByIdArgs) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/users/' + fetchUserByIdArgs.userId);
  if (!response.ok) throw new Error('ユーザーの取得に失敗しました');
  return (await response.json()) as User;
}); 