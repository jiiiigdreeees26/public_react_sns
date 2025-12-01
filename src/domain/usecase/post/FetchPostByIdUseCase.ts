import { PostRepository } from "../../../data/repositories/PostRepository";
import { Post } from "../../entities/Post";

export class FetchPostByIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(postId: number): Promise<Post | null> {
    if (!postId) throw new Error('Post ID is required');
    return await this.postRepository.fetchPostById(postId);
  }
}