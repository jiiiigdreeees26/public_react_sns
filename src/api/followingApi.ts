import { createAsyncThunk } from "@reduxjs/toolkit";
import { Following } from "../domain/entities/Following";

interface addFollowingArgs {
  following: Omit<Following, 'id'>;
  accessToken: string;
}
export const addFollowing = createAsyncThunk(
  'followings/addFollowing',
  async (addFollowingArgs: addFollowingArgs) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/followings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  (addFollowingArgs.accessToken || '')
      },
      body: JSON.stringify(addFollowingArgs.following),
    });

    if (!response.ok) throw new Error('フォロー情報の追加に失敗しました');

    return (await response.json()) as Following;
  },
);

// 非同期のフォロー情報データ取得処理
export const fetchFollowings = createAsyncThunk('followings/fetchFollowings', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/followings');
  if (!response.ok) throw new Error('フォロー情報の取得に失敗しました');
  return (await response.json()) as Following[];
});

export const fetchFollowingByUserId= createAsyncThunk('followings/fetchFollowingByUserId', async (followingId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/followings/user/' + followingId);
  if (!response.ok) throw new Error('フォロー情報の取得に失敗しました');
  return (await response.json()) as Following[];
}); 

export interface DeleteFollowingResponse {
  id: number
  deleted: boolean
}

interface deleteFollowingArgs {
  following: Omit<Following, 'followUserId' | 'followedUserId'>;
  accessToken: string;
}
export const deleteFollowing = createAsyncThunk(
  'followings/deleteFollowing',
  async (deleteFollowingArgs: deleteFollowingArgs) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/followings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  (deleteFollowingArgs.accessToken || '')
      },
      body: JSON.stringify(deleteFollowingArgs.following),
    });

    if (!response.ok) throw new Error('フォロー情報の削除に失敗しました');

    return (await response.json()) as DeleteFollowingResponse;
  },
);