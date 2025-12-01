import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../domain/entities/Comment";

interface addCommentArgs {
  comment: Omit<Comment, 'id'>;
  accessToken: string;
}
export const addComment = createAsyncThunk(
  'posts/addComment',
  async (addCommentArgs: addCommentArgs) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  (addCommentArgs.accessToken || '')
      },
      body: JSON.stringify(addCommentArgs.comment),
    });

    if (!response.ok) throw new Error('コメントの追加に失敗しました');

    return (await response.json()) as Comment;
  },
);

// 非同期のコメントデータ取得処理
export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/comments');
  if (!response.ok) throw new Error('コメントの取得に失敗しました');
  return (await response.json()) as Comment[];
});

export const fetchCommentsByPostId= createAsyncThunk('comments/fetchCommentsByPostId', async (postId: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/backend/comments/posts/' + postId);
  if (!response.ok) throw new Error('コメントの取得に失敗しました');
  return (await response.json()) as Comment[];
}); 