import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { selectPosts } from "../../../store/postsSlice";
import { selectUser } from "../../../store/userSlice";
import { CommentForm } from "../CommentForm/CommentForm";
import { PostElement } from "../PostList/PostElement";
import { useEffect, useState } from "react";
import { PostRepositoryImpl } from "../../../data/repositories/PostRepository";
import { AppDispatch } from "../../../store/store";
import { PostDetailPresenter, PostDetailViewModel } from "../../presenters/PostDetailPresenter";
import { FetchPostByIdUseCase } from "../../../domain/usecase/post/FetchPostByIdUseCase";
import { CommentRepositoryImpl } from "../../../data/repositories/CommentRepository";
import { FetchCommentsByPostIdUseCase } from "../../../domain/usecase/comment/FetchCommentsByPostIdUseCase";

export const PostDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const postId: number = typeof(params?.postId) === "string" ? Number(params.postId) : 0;
  const users = useSelector(selectUser).users;
  const { posts, loading, error } = useSelector(selectPosts);
  const postRepository = new PostRepositoryImpl(dispatch);
  const fetchPostByIdUseCase = new FetchPostByIdUseCase(postRepository);
  const commentRepository = new CommentRepositoryImpl(dispatch);
  const fetchCommentsByPostIdUsecase = new FetchCommentsByPostIdUseCase(commentRepository);

  const presenter = new PostDetailPresenter();
  const [viewModel, setViewModel] = useState<PostDetailViewModel>({
    post: {
      id: 0,
      content: '',
      likes: 0,
      userId: 0
    },
    userName: '',
    isCommentDisplayed: true,
  });
  useEffect(() => {
      if (postId > 0) {
        fetchPostByIdUseCase
          .execute(postId)
          .then((post) => {
            setViewModel(presenter.toViewModel(post, users));
          })
          .catch((err) => console.error(err));
        fetchCommentsByPostIdUsecase.execute(postId).catch((err) => console.error(err));
      }
  }, [postId]);  

  useEffect(() => {
    const updatedPost = posts.filter(v => v.id == postId)[0];
    setViewModel(presenter.toViewModel(updatedPost, users));
  }, [posts]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!viewModel.post) return <p>投稿が見つかりません</p>;
  return (
    <div>
      <PostElement post={viewModel.post} userName={viewModel.userName} isCommentDisp={viewModel.isCommentDisplayed}  />
      <CommentForm />
    </div>
  );
}