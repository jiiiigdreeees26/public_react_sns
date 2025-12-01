// import postsReducer, { addPost, likePost } from "../postsSlice";

test.skip("addPostを実行するとポストが追加される", () => {
  const initialState = {
    posts: [],
    loading: false,
    error: null
  };
  // const newState = postsReducer(initialState, addPost({content: 'aa', userId: 501}));
  // expect(newState.posts[0].id).toBe(1);
  // expect(newState.posts[0].content).toBe('aa');
  // expect(newState.posts[0].likes).toBe(0);
  // expect(newState.posts[0].userId).toBe(501);
});

test.skip("likePostを実行すると指定したポストIDのいいねが1つ増える", () => {
  const initialPost = [{ 
    id: 1,
    content: '初めての投稿！',
    likes: 3,
    userId: 501
  }]

  const initialState = {
    posts: initialPost,
    loading: false,
    error: null
  };
  // const newState = postsReducer(initialState, likePost(1));
  // expect(newState.posts[0].id).toBe(1);
  // expect(newState.posts[0].content).toBe('初めての投稿！');
  // expect(newState.posts[0].likes).toBe(4);
  // expect(newState.posts[0].userId).toBe(501);
});