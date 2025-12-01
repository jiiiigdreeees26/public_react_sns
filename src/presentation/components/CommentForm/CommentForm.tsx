import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { selectPosts } from '../../../store/postsSlice';
import { AppDispatch } from '../../../store/store';
import { selectUser } from '../../../store/userSlice';
import { CommentRepositoryImpl } from '../../../data/repositories/CommentRepository';
import { AddCommentUseCase } from '../../../domain/usecase/comment/AddCommentUseCase';

export const CommentForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];
  const params = useParams();
  const postId: number = typeof(params?.postId) === "string" ? Number(params.postId) : 0;
  const { loading, error } = useSelector(selectPosts);


  const commentRepository = new CommentRepositoryImpl(dispatch);
  const addCommentUsecase = new AddCommentUseCase(commentRepository);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    addCommentUsecase.execute(content, postId, loginUser?.id, (session as any)?.jwt?.accessToken);
    setContent(''); // フォームをリセット
  };

  if (loading) return;
  if (error) return;
  if (!session) return <p>サインインが必要です。</p>;
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-md"
    >
      <textarea
        className="w-full p-2 border rounded-lg"
        rows={3}
        placeholder="返信"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        投稿する
      </button>
    </form>
  );
};
