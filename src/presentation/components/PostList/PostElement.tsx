import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Post } from '../../../domain/entities/Post';
import { AppDispatch } from '../../../store/store';
import { CommentElement } from './CommentElement';
import { LikePostUseCase } from '../../../domain/usecase/post/LikePostUseCase';
import { PostRepositoryImpl } from '../../../data/repositories/PostRepository';

interface PostProps {
  post: Post;
  userName?: string;
  isCommentDisp?: boolean;
}

export const PostElement = ({
  post,
  userName,
  isCommentDisp = false,
}: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const postRepository = new PostRepositoryImpl(dispatch);
  const likePostsUseCase = new LikePostUseCase(postRepository);
  return (
    <div
      key={post?.id}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
      }}
      className="rounded-xl"
    >
      <div>
        <Link
          href={{
            pathname: '/post/detail/[postId]',
            query: { postId: post?.id },
          }}
          className="hover:underline"
        >
          {post?.content}
        </Link>
      </div>
      <button onClick={() => likePostsUseCase.execute(Number(post?.id))}>
        ❤️ {post?.likes}
      </button>
      <div className="flex flex-row">
        {userName && (
          <Link
            href={{
              pathname: '/user/detail/[userId]',
              query: { userId: post.userId },
            }}
            className="hover:underline"
          >
            {userName}
          </Link>
        )}
        &nbsp;
        <CommentElement postId={post?.id} isCommentDisp={isCommentDisp} />
      </div>
    </div>
  );
};