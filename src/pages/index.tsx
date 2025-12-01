import { PostList } from '../presentation/components/PostList/PostList';
import { PostForm } from '../presentation/components/PostForm/PostForm';

export default function Home() {
  return (
    <div>
      <PostList />
      <PostForm />
    </div>
  );
}
