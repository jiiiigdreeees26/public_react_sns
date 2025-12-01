import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../domain/entities/Post";

interface addPostArgs {
  post: Omit<Post, 'id' | 'likes'>;
  accessToken: string;
}
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (addPostArgs: addPostArgs) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  (addPostArgs.accessToken || '')
      },
      body: JSON.stringify(addPostArgs.post),
    });

    if (!response.ok) throw new Error('投稿の追加に失敗しました');

    return (await response.json()) as Post;
  },
);

// 非同期の投稿データ取得処理
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/posts'); // Go の API にリクエスト
  if (!response.ok) throw new Error('投稿の取得に失敗しました');
  return (await response.json()) as Post[];
});

export const fetchPostById= createAsyncThunk('posts/fetchPostById', async (postId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/posts/' + postId);
  if (!response.ok) throw new Error('投稿の取得に失敗しました');
  return (await response.json()) as Post;
}); 

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/posts/likes/' + postId, {
      method: 'PUT'
    });

    if (!response.ok) throw new Error('投稿のいいねに失敗しました');

    return (await response.json()) as Post;
  },
);