import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/posts', () => {
    return HttpResponse.json(
      [
        { id: 1, userId: 1, content: 'Test Post 1' },
        { id: 2, userId: 1, content: 'Test Post 2' },
        { id: 3, userId: 2, content: 'testtesttest' },
        { id: 4, userId: 501, content: '投稿してます' },
      ],
      { status: 200 }
    );
  }),
  http.post(process.env.NEXT_PUBLIC_API_URL + '/api/posts', () => {
    return HttpResponse.json(
      { id: 1, userId: 1, content: 'Test Post 1' },
      { status: 201 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/posts/:postId', ({ params }) => {
    return HttpResponse.json(
      {
        id: Number(params.postId),
        userId: 1,
        content: 'Test Post',
      },
      { status: 200 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/users', () => {
    return HttpResponse.json(
      [
        {"id":501,"name":"eiki","email":process.env.NEXT_PUBLIC_TEST_USER_EMAIL1},
        {"id":1,"name":"user","email":""},
      ],
      { status: 200 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/comments', () => {
    return HttpResponse.json(
      [{"id":1,"content":"コメント","postId":5001,"userId":502},{"id":2,"content":"コメントです","postId":5001,"userId":502},{"id":3,"content":"コメントだよ","postId":5001,"userId":502},{"id":4,"content":"コメント_0902","postId":5,"userId":5},{"id":5,"content":"コメント_0915","postId":1,"userId":5},{"id":6,"content":"コメント_0915","postId":2,"userId":5},{"id":7,"content":"コメント_0915","postId":2,"userId":5},{"id":8,"content":"コメント_0915","postId":2,"userId":5},{"id":9,"content":"コメント_0915","postId":2,"userId":5},{"id":10,"content":"コメント_0915","postId":2,"userId":5},{"id":11,"content":"コメント_0915","postId":2,"userId":5},{"id":12,"content":"コメント_0915","postId":2,"userId":5},{"id":13,"content":"コメント_0915","postId":2,"userId":5},{"id":14,"content":"コメント_0915","postId":2,"userId":5},{"id":15,"content":"コメント_0915???","postId":2,"userId":5},{"id":16,"content":"コメント_0915???","postId":2,"userId":5},{"id":17,"content":"コメント_0915???","postId":2,"userId":5},{"id":18,"content":"コメント_0915???","postId":2,"userId":5},{"id":19,"content":"コメント_0915","postId":2,"userId":5},{"id":20,"content":"コメント_0915","postId":2,"userId":5},{"id":21,"content":"コメント！！！！","postId":2,"userId":501},{"id":22,"content":"s","postId":5001,"userId":501},{"id":23,"content":"sss","postId":5001,"userId":501},{"id":24,"content":"今追加しました。","postId":5001,"userId":501},{"id":25,"content":"7件目のコメント","postId":5001,"userId":501},{"id":26,"content":"0918","postId":2,"userId":501},{"id":27,"content":"追加！！！","postId":1,"userId":501},{"id":28,"content":"コメントです","postId":23,"userId":501},{"id":29,"content":"1コメ","postId":473,"userId":501},{"id":30,"content":"サワーチーズ？？？？","postId":3863,"userId":501},{"id":31,"content":"2つめのコメントです！！","postId":473,"userId":501},{"id":32,"content":"コメントだ！！！！","postId":5003,"userId":501},{"id":33,"content":"コメントです","postId":5045,"userId":501}],
      { status: 200 }
    );
  }),
  http.get(process.env.NEXT_PUBLIC_API_URL + '/api/followings', () => {
    return HttpResponse.json(
      [{"id":1,"followUserId":501,"followedUserId":502},{"id":2,"followUserId":502,"followedUserId":501},{"id":3,"followUserId":6,"followedUserId":501},{"id":4,"followUserId":8,"followedUserId":1},{"id":5,"followUserId":8,"followedUserId":1},{"id":6,"followUserId":1,"followedUserId":8},{"id":7,"followUserId":501,"followedUserId":504},{"id":8,"followUserId":501,"followedUserId":466},{"id":9,"followUserId":501,"followedUserId":452},{"id":10,"followUserId":502,"followedUserId":452},{"id":11,"followUserId":501,"followedUserId":483},{"id":12,"followUserId":501,"followedUserId":20},{"id":13,"followUserId":501,"followedUserId":1}],
      { status: 200 }
    );
  }),
];

export const server = setupServer(...handlers);