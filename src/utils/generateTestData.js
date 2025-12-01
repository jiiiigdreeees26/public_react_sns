import { faker } from '@faker-js/faker';

// 50件の投稿データを生成
export const generatePosts = (count = 50) => {
  return Array.from({ length: count }, () => ({
    id: Number(faker.string.uuid()),  // ランダムなUUID
    content: 'test',  // ランダムな文（10単語程度）
    auther: 'test',  // ランダムなユーザー名
    likes: 2,
  }));
};
