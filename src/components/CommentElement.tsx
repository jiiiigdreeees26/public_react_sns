import { useSelector } from 'react-redux';
import { selectComment } from '../store/commentSlice';
import { selectUser } from '../store/userSlice';

interface CommentProps {
  postId: number;
  isCommentDisp?: boolean;
}

export const CommentElement = ({
  postId,
  isCommentDisp = false,
}: CommentProps) => {
  const comments = useSelector(selectComment).comments.filter(
    (v) => v.postId === postId,
  );
  const users = useSelector(selectUser).users;
  return (
    <div>
      {comments.length > 0 && !isCommentDisp && (
        <p className="text-gray-500 dark:text-gray-400">
          コメント件数[{comments.length}]
        </p>
      )}
      {comments.length > 0 &&
        isCommentDisp &&
        comments
          .sort((a, b) => a.id - b.id)
          .map((comment, i) => (
            <div>
              { i === 0 && <br />}
              <p className="text-gray-500 dark:text-gray-400">
                {comment.content} by{' '}
                {users.filter((user) => user.id === comment.userId)[0].name}
              </p>
            </div>
          ))}
    </div>
  );
};